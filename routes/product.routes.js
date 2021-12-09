import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from '../models/users_model.js';
const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('vwProduct/detail', {layout: 'main'})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const obj = await productModel.findById(id);
    const categories = await categoryModel.findByPro(id);
    const seller = await userModel.getSellerByPro(id);
    res.render('vwProduct/detail', {
        layout: 'main',
        product : obj[0],
        category: categories[0],
        seller
    })
})


export default router;