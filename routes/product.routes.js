import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from '../models/users_model.js';
import fs from 'fs';
import auth from "../middleware/auth.mdware.js";
import bidModel from "../models/bid.model.js";
const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('vwProduct/detail', {layout: 'main'})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const folder = "./public/imgs/sp/" + id + '/';
    const img_files = fs.readdirSync(folder);
    img_files.splice(img_files.indexOf('main_thumbs.jpg'));
    var imgs = []
    img_files.forEach((file) => {
        imgs.push({file_name : file, ProID: id});
    })

    const pro = await productModel.findById(id);
    const categories = await categoryModel.findByPro(id);
    const sellers = await userModel.getSellerByPro(id);
    sellers.forEach(async (seller) => {
        const s = await userModel.getAllScore(seller.ID);
        const p = await productModel.countAllByUser(seller.ID);
        seller.Score = s[0].score || 0;
        seller.numPro = p[0].p || 0;
    });
    const bid_his = await bidModel.getHistoryByPro(id);
    bid_his.forEach( async (his) => {
        const s = await userModel.getAllScore(his.ID);
        his.Score = s[0].score || 0;
    });
    const sameCat = await productModel.proSameCat(pro[0].CatID, id);
    const highestPrice = await productModel.getCurrentBid(id);
    res.render('vwProduct/detail', {
        layout: 'main',
        product : pro[0],
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
    console.log(BID + "," + ProID + "," + MaxPrice);
    const product = await productModel.findById(ProID);
    var err_message = null;
    const top = await bidModel.getTop();
    if(top[0].BID == BID && top[0].ProID == ProID){
        err_message = 'You are at top bid now ! Stay chill until someone get over !';
    }
    if(err_message){
        req.flash('success', err_message);
        return res.redirect('/product/' + req.params.id)
    }
    else {
        if(product[0].AllowAll === 0){
            // calculate the score of user
            if (userModel.getPercentScore(BID) >= 0.8) {
                const result = await bidModel.addBid(BID, ProID, MaxPrice);
            } else {
                err_message = "Your current point is too low to bid this product !";
                req.flash('success', err_message);
                return res.redirect('/product/' + req.params.id)
            }
        }
        else {
            // allow all user to buy
            const result = await bidModel.addBid(BID, ProID, MaxPrice);
        }
        return res.redirect('/product/' + req.params.id)
    }
})


export default router;