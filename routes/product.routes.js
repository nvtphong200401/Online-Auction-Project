import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from '../models/users_model.js';
import bid_historyModel from "../models/bid_history.model.js";
const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('vwProduct/detail', {layout: 'main'})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const pro = await productModel.findById(id);
    const categories = await categoryModel.findByPro(id);
    const sellers = await userModel.getSellerByPro(id);
    sellers.forEach(async (seller) => {
        const s = await userModel.getAllScore(seller.ID);
        const p = await productModel.countAllByUser(seller.ID);
        seller.Score = s[0].score || 0;
        seller.numPro = p[0].p || 0;
    });
    const bid_his = await bid_historyModel.getHistoryByPro(id);
    bid_his.forEach( async (his) => {
        const s = await userModel.getAllScore(his.ID);
        his.Score = s[0].score || 0;
    });
    res.render('vwProduct/detail', {
        layout: 'main',
        product : pro[0],
        category: categories[0],
        seller: sellers[0] || 0,
        bid_his
    })
})


export default router;