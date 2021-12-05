import express from "express";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

const router = express.Router();

router.get('/', async function (req, res) {
   const productList = await productModel.findAll();
   console.log(productList);
    res.render('vwSeller/active', {
        layout: 'seller',
        products: productList
    });
})

router.get('/product/list/active', async function(req, res) {
    res.render('vwSeller/active', {
        layout: 'seller'
    });
})

router.get('/product/list/sold', async function (req, res) {
    res.render('vwSeller/sold', {
        layout: 'seller'
    });
})

export default router;