import express from "express";
import fs from 'fs';
import moment from "moment";
import numeral from "numeral";
import nodemailer from 'nodemailer';

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from '../models/users_model.js';
import bidModel from "../models/bid.model.js";
import commentModel from "../models/comment.model.js";
import auth from "../middleware/auth.mdware.js";

const router = express.Router();

function sendEmail(email, message, title) {
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dragonslayers248@gmail.com',
            pass: 'matkhauvip'
        }
    });
    let mailOptions = {
        from: 'dragonslayers248@gmail.com',
        to: email,
        subject: title + ' - onlineauction.com',
        html: '<p>' + message + '</p>'

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
    res.render('vwProduct/detail', {layout: 'main'})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const folder = "./public/imgs/sp/" + id + '/';
    const img_files = fs.readdirSync(folder);

    let imgs = []
    let i = 0;
    img_files.forEach((file) => {
        imgs.push({file_name: file, ProID: id, active: i === 0});
        i++;
    })

    const pro = await productModel.findById(id);
    if (!pro[0])
        return res.redirect("/unknown");
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
    let isSeller = false;
    let isUser = false;
    if (res.locals.auth === true) {
        isUser = true;
        isSeller = (sellers.length !== 0) && (sellers[0].ID === res.locals.authUser.ID);
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
        isSeller,
        isUser,
        empty: sameCat.length === 0,
        minPrice: +highestPrice + +pro[0].Step_price,
        err_message: req.flash("bid_success"),

    })
})
router.post('/:id', auth, async (req, res) => {
    const BID = req.session.authUser.ID;
    const ProID = req.params.id;
    const MaxPrice = numeral(req.body.BidPrice).value();
    const highestPrice = await productModel.getCurrentBid(ProID);
    const product = await productModel.findById(ProID);
    const stepPrice = +product[0].Step_price;

    if (+MaxPrice < +highestPrice + stepPrice) {
        req.flash('success', 'Your bid is too low! Your bid should be at least ' + numeral((+highestPrice + stepPrice)).format('0,0') + ' VND');
        return res.redirect('/product/' + ProID);
    }

    const isBannedOnProduct = await userModel.isBannedOnProduct(BID, ProID);
    if (isBannedOnProduct) {
        req.flash('success', 'You have been banned by the seller on this product !');
        return res.redirect('/product/' + ProID);
    }

    let err_message = null;
    const t = await bidModel.getTop2(ProID);
    if (t.length > 0) {
        if (t[0].BID === BID) {
            await bidModel.updateBid(BID, ProID, MaxPrice);
            err_message = 'You are at top bid now ! Stay chill until someone get over !';
        }
    }
    if (err_message) {
        req.flash('success', err_message);
        return res.redirect('/product/' + ProID)
    } else {
        if (product[0].AllowAll === 0) {
            // calculate the score of user
            const score = await commentModel.percentGoodComment(BID);
            if (score < 0.8) {
                err_message = "Your current point is too low to bid this product !";
                req.flash('success', err_message);
                return res.redirect('/product/' + ProID)
            }
        }
        // allow all user to buy or valid user only
        const b = await bidModel.findBid(BID, ProID);
        if (b.length > 0) {
            // if user already bid product
            await bidModel.updateBid(BID, ProID, MaxPrice);
        }
        else {
            // if this is the first time
            await bidModel.addBid(BID, ProID, MaxPrice);
        }
        const top = await bidModel.getTop2(ProID);
        //send email to current top bid
        const user1 = await userModel.findByID(top[0].BID);
        sendEmail(user1.Email,`You are now on the top bidder of product ${product[0].ProName} ! 
        See detail in this <a href="http://localhost:3000/product/${ProID}">Link</a>`, "Bid system");
        //send email to previous top bid
        if (top[1] !== undefined) {
            const user2 = await userModel.findByID(top[1].BID);
            sendEmail(user2.Email,`Someone has got over you in product ${product[0].ProName} ! 
            Go <a href="http://localhost:3000/product/${ProID}">here</a> to bid a new price now !`, "Bid system");
        }
        //send email to seller
        const seller = await productModel.getSeller(ProID);
        sendEmail(seller[0].Email, `Someone has bidden on product ${product[0].ProName} ! Visit <a href="http://localhost:3000/product/${ProID}">here</a> to see `,"Bid system");
        
        // auto time
        if (product[0].AutoTime === 1) {
            const now = new Date();
            const EndDate = product[0].EndDate;
            const minLeft = parseInt((Math.abs(EndDate.getTime() - now.getTime()) / 1000) / 60);
            if (minLeft <= 5) {
                EndDate.setMinutes(EndDate.getMinutes() + 10);
                await productModel.updateEndTime(ProID, EndDate);
            }
        }
        req.flash("bid_success", "You have bid this product successfully!")
        return res.redirect('/product/' + ProID);
    }
})
router.post('/buy/:id', auth, async (req, res) => {
    await productModel.buyNow(req.params.id, req.session.authUser.ID);
    return res.redirect('/product/' + req.params.id);
})

// perform check on expired product for winner and email user if necessary
setInterval(async () => {
    const now = new Date();
    const products = await productModel.findAll();
    for (const product of products) {
        if (product.EndDate < now && product.Status === 0) {
            await productModel.setSold(product.ProID);
            const seller = await userModel.findByID(product.SID);
            const winner = await productModel.getWinner(product.ProID) || await productModel.findHighestBID(product.ProID);
            if (winner === null) {
                sendEmail(seller.Email, `Your product ${product.ProName} has ended but no one seems to bid on it !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
            } else {
                console.log(winner);
                await productModel.addWinner(winner.ID, product.ProID);
                sendEmail(seller.Email, `Your product ${product.ProName} has been sold to ${winner.FullName} !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
                sendEmail(winner.Email, `You have won the bid on ${product.ProName} !
                Go to <a href="http://localhost:3000/product/${product.ProID}">here</a> for more information!`, "Bid system");
            }
        }
    }
}, 5000)

export default router;