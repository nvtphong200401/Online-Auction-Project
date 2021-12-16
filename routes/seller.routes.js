import express from "express";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

const router = express.Router();

router.get('/', async function (req, res) {
    res.redirect('/seller/product/list/active');
})

router.get('/product/list/active', async function(req, res) {
    const limit = 5;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countAll();
    let numPages = Math.floor(total/limit);
    if (total % limit > 0) numPages++;

    const pageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
        pageNumbers.push({
           value: i,
            isCurrent: +page === i,
        });
    }

    const productList = await productModel.findPage(limit, offset);
    res.render('vwSeller/active', {
        layout: 'seller',
        products: productList,
        pageNumbers
    });
})

router.get('/product/list/sold', async function (req, res) {
    const limit = 5;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countAll();
    let numPages = Math.floor(total/limit);
    if (total % limit > 0) numPages++;

    const pageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i,
        });
    }

    const productList = await productModel.findPage(limit, offset);
    res.render('vwSeller/sold', {
        layout: 'seller',
        products: productList,
        pageNumbers
    });
})

router.post('/product/add', function(req, res) {
    console.log(req.body);
    res.redirect('/seller/product/list/active');
})

router.get('/product/add', async function(req, res) {
    const catList = await categoryModel.findAllSubCat();
    res.render('vwSeller/add', {
        layout: 'seller',
        catList: catList
    });
})

export default router;