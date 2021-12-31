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
    const sellers = await userModel.getSellerByPro(id);
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
    const sameCat = await productModel.proSameCat(pro[0].CatID, id);
    const highestPrice = await productModel.getCurrentBid(id);
    res.render('vwProduct/detail', {
        layout: 'main',
        product: pro[0],
        category: categories[0],
        seller: sellers[0] || 0,
        highestPrice,
        bid_his,
        sameCat,
        imgs
    })
})
router.post('/:id', auth, async (req, res) => {
    const BID = req.session.authUser.ID;
    const ProID = req.params.id;
    const MaxPrice = req.body.BidPrice;
    const product = await productModel.findById(ProID);
    const seller = await productModel.getSeller(ProID);
    console.log(seller)
    var err_message = null;
    const t = await bidModel.getTop2();
    if (t.length > 0) {
        if (t[0].BID == BID && t[0].ProID == ProID) {
            err_message = 'You are at top bid now ! Stay chill until someone get over !';
        }
    }
    if (err_message) {
        req.flash('success', err_message);
        return res.redirect('/product/' + req.params.id)
    }
    else {
        if (product[0].AllowAll === 0) {
            // calculate the score of user
            if (userModel.getPercentScore(BID) >= 0.8) {
                const result = await bidModel.addBid(BID, ProID, MaxPrice);
                const top = await bidModel.getTop2();
                const user1 = await userModel.findByID(top[0].BID);
                
                sendEmail(user1.Email,`You are now on the top bidder of product ${product[0].ProName} ! See detail in this <a href="http://localhost:3000/product/${req.params.id}">Link</a>`, "Bid system");

                if (top[1] !== undefined) {
                    const user2 = await userModel.findByID(top[1].BID);
                    sendEmail(user2.Email,`Someone has got over you in product ${product[0].ProName} ! Go <a href="http://localhost:3000/product/${req.params.id}">here</a> to bid a new price now !`, "Bid system");
                }
            } else {
                err_message = "Your current point is too low to bid this product !";
                req.flash('success', err_message);
                return res.redirect('/product/' + req.params.id)
            }
        }
        else {
            // allow all user to buy
            const result = await bidModel.addBid(BID, ProID, MaxPrice);
            const top = await bidModel.getTop2();
            const user1 = await userModel.findByID(top[0].BID);
            console.log(user1);
            sendEmail(user1.Email,`You are now on the top bidder of product ${product[0].ProName} ! See detail in this <a href="http://localhost:3000/product/${req.params.id}">Link</a>`, "Bid system");
            if (top[1] !== undefined) {
                const user2 = await userModel.findByID(top[1].BID);
                sendEmail(user2.Email,`Someone has got over you in product ${product[0].ProName} ! Go <a href="http://localhost:3000/product/${req.params.id}">here</a> to bid a new price now !`, "Bid system");
            }
        }
        return res.redirect('/product/' + req.params.id)
    }
})
router.post('/buy/:id', auth, async (req,res) => {
    console.log(req.params.id);
    return res.redirect('/product/' + req.params.id)
})


export default router;