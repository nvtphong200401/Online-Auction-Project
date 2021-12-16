import express from "express";
import moment from "moment";
import multer from "multer";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/seller/product/list/active');
})

router.get('/product/list/active', async function(req, res) {
    const limit = 5;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countAllActive();
    let numPages = Math.floor(total/limit);
    if (total % limit > 0) numPages++;

    const pageNumbers = [];
    for (let i = 1; i <= numPages; i++) {
        pageNumbers.push({
           value: i,
            isCurrent: +page === i,
        });
    }

    const productList = await productModel.findActivePage(limit, offset);
    productList.forEach(async (product) => {
        const cat = await categoryModel.findByPro(product.ProID);
        product.CatName = cat[0].CatName;
        const highestBid = await productModel.findHighestBID(product.ProID);
        if (highestBid === null) {
            product.HighestBid = "None";
        }
        else {
            product.HighestBid = highestBid.Price;
        }
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

const upload = multer({dest: 'uploads/'});
const cpUpload = upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'subImages', maxCount: 10}])
router.post('/product/add', cpUpload,function(req, res) {
    console.log(req.files);
    console.log(req.body);
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, './public/imgs/sp')
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, file.)
    //     }
    // })

    const upload = multer({ storage: storage })
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