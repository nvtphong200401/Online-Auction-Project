import express from "express";
import moment from "moment";

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
    productList.forEach(async (product) => {
        const cat = await categoryModel.findByPro(product.ProID);
        product.CatName = cat[0].CatName;
        product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
        product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
    })
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
    productList.forEach(async (product) => {
        const cat = await categoryModel.findByPro(product.ProID);
        product.CatName = cat[0].CatName;
        product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
        product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
    })
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