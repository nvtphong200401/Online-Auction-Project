import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from '../models/users_model.js';
import fs from 'fs';
import auth from "../middleware/auth.mdware.js";
import bidModel from "../models/bid.model.js";
import nodemailer from 'nodemailer';
import moment from "moment";
const router = express.Router();

function sendEmail(email, message, title) {
    var email = email;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dragonslayers248@gmail.com',
            pass: 'matkhauvip'
        }
    });
    var mailOptions = {
        from: 'dragonslayers248@gmail.com',
        to: email,
        subject: title + ' - onlineauction.com',
        html: '<p>'+message+'</p>'

    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            return 1
        } else {
            return 0
        }
    });
}

router.get('/detail', (req, res) => {
    res.render('vwProduct/detail', { layout: 'main' })
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const folder = "./public/imgs/sp/" + id + '/';
    const img_files = fs.readdirSync(folder);
    img_files.splice(img_files.indexOf('main_thumbs.jpg'));
    var imgs = []
    img_files.forEach((file) => {
        imgs.push({ file_name: file, ProID: id });
    })

    const pro = await productModel.findById(id);
    const categories = await categoryModel.findByPro(id);
    const sellers = await productModel.getSeller(id);
    for (const seller of sellers) {
        const s = await userModel.getAllScore(seller.ID);
        const p = await productModel.countAllByUser(seller.ID);
        seller.Score = s[0].score || 0;
        seller.numPro = p[0].p || 0;
    }
    const bid_his = await bidModel.getHistoryByPro(id);
    for (const his of bid_his) {
        const s = await userModel.getAllScore(his.ID);
        his.Score = s[0].score || 0;
        his.Time = moment(his.Time).format('DD/MM/YYYY hh:mm:ss')
    }
    var isSeller = false;
    if (res.locals.auth === true) {
      isSeller = sellers[0].ID === res.locals.authUser.ID;
    }
    const sameCat = await productModel.proSameCat(pro[0].CatID, id);
    const highestPrice = await productModel.getCurrentBid(id);
    res.render('vwProduct/detail', {
        layout: 'main',
        product: pro[0],
        category: categories[0],
        seller: sellers[0] || 0,
        highestPrice,
        bid_his: bid_his || 0,
        sameCat,
        imgs,
        isSeller: isSeller
    })
})
router.post('/:id', auth, async (req, res) => {
    const BID = req.session.authUser.ID;
    const ProID = req.params.id;
    const MaxPrice = req.body.BidPrice;
    const highestPrice = await productModel.getCurrentBid(ProID);
    if (MaxPrice < highestPrice) {
        req.flash('success', 'You bid is too low! Please try again with higher bid');
        return res.redirect('/product/' + ProID);
    }
    const product = await productModel.findById(ProID);

    const isBannedOnProduct = await userModel.isBannedOnProduct(BID, ProID);
    if (isBannedOnProduct) {
        req.flash('success', 'You have been banned by the seller on this product !');
        return res.redirect('/product/' + ProID);
    }

    var err_message = null;
    const t = await bidModel.getTop2(ProID);
    if (t.length > 0) {
        if (t[0].BID == BID) {
            await bidModel.updateBid(BID, ProID, MaxPrice);
            err_message = 'You are at top bid now ! Stay chill until someone get over !';
        }
    }
    if (err_message) {
        req.flash('success', err_message);
        return res.redirect('/product/' + ProID)
    }
    else {
        if (product[0].AllowAll === 0) {
            // calculate the score of user
            if (userModel.getPercentScore(BID) >= 0.8) {
                //check if bid in db, update it
                const b = await bidModel.findBid(BID, ProID);
                if (b.length > 0) {
                    await bidModel.updateBid(BID, ProID, MaxPrice);
                    return res.redirect('/product/' + ProID)
                }

                // not in db
                const result = await bidModel.addBid(BID, ProID, MaxPrice);
                const top = await bidModel.getTop2(ProID);
                const user1 = await userModel.findByID(top[0].BID);
                
                sendEmail(user1.Email,`You are now on the top bidder of product ${product[0].ProName} ! See detail in this <a href="http://localhost:3000/product/${ProID}">Link</a>`, "Bid system");

                if (top[1] !== undefined) {
                    const user2 = await userModel.findByID(top[1].BID);
                    sendEmail(user2.Email,`Someone has got over you in product ${product[0].ProName} ! Go <a href="http://localhost:3000/product/${ProID}">here</a> to bid a new price now !`, "Bid system");
                }
            } else {
                err_message = "Your current point is too low to bid this product !";
                req.flash('success', err_message);
                return res.redirect('/product/' + ProID)
            }
        }
        else {
            // allow all user to buy
            const b = await bidModel.findBid(BID, ProID);
            if (b.length > 0) {
                await bidModel.updateBid(BID, ProID, MaxPrice);
                return res.redirect('/product/' + ProID)
            }
            await bidModel.addBid(BID, ProID, MaxPrice);
            const top = await bidModel.getTop2(ProID);
            const user1 = await userModel.findByID(top[0].BID);
            sendEmail(user1.Email,`You are now on the top bidder of product ${product[0].ProName} ! 
            See detail in this <a href="http://localhost:3000/product/${ProID}">Link</a>`, "Bid system");
            if (top[1] !== undefined) {
                const user2 = await userModel.findByID(top[1].BID);
                sendEmail(user2.Email,`Someone has got over you in product ${product[0].ProName} ! 
                Go <a href="http://localhost:3000/product/${ProID}">here</a> to bid a new price now !`, "Bid system");
            }
        }
        // auto time
        if (product[0].AutoTime === 1) {
            const now = new Date();
            const EndDate = product[0].EndDate;
            const minLeft = parseInt((Math.abs(EndDate.getTime() - now.getTime())/1000)/60);
            if (minLeft <= 5) {
                EndDate.setMinutes(EndDate.getMinutes() + 10);
                await productModel.updateEndTime(ProID, EndDate);
            }
        }
        return res.redirect('/product/' + ProID);
    }
})
router.post('/buy/:id', auth, async (req,res) => {
    return res.redirect('/product/' + req.params.id)
})

// perform check on expired product for winner and email user if neccessary
setInterval(async () => {
    const now = new Date();
    const products = await productModel.findAll();
    for (const product of products) {
        if (product.EndDate < now && product.Status === 0) {
            await productModel.setSold(product.ProID);
            const seller = await userModel.findByID(product.SID);
            const winner = await productModel.findHighestBID(product.ProID);
            if (winner === null) {
                sendEmail(seller.email, `Your product ${product.ProName} has ended but no one seems to bid on it !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
            } else {
                await productModel.setSold(product.ProID);
                await productModel.addWinner(winner.ID, product.ProID);
                sendEmail(seller.email, `Your product ${product.ProName} has been sold to ${winner.FullName} !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
                sendEmail(winner.email, `You have won the bid on ${product.ProName} !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
            }
        }
    }
}, 5000)

export default router;