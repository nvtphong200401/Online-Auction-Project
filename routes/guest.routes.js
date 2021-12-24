import express, { query } from "express";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";


const router = express.Router();


router.get('/', async function (req, res) {
    const top_end = await productModel.findTopEnd() || 0;
    const top_bid = await productModel.findTopBid() || 0;
    const top_price = await productModel.findTopPrice() || 0;
    const category = await categoryModel.findAllMain() || 0;
    for (let c of category) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }

    const title = ["End soon", "Most bid", "Highest price"];
    const data = [
        {title: title[0], list: top_end},
        {title: title[1], list: top_bid},
        {title: title[2], list: top_price}
    ];
    res.render('home', {
        layout: 'main',
        category: category,
        title: title,
        data: data
    });
});

router.get('/byCat/:id', function (req, res) {
    const CatId = req.params.id || 1;

    res.redirect('/byCat/' + CatId + '/1');
})

router.get('/byCat/:id/:page', async function (req, res) {
    const CatId = req.params.id || 1;
    let PageNow = req.params.page || 1;
    const CatList = await categoryModel.findAllMain() || 0;
    for (let c of CatList) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }
    const nProduct = 8;
    const ProductList = await productModel.findPageByCat(CatId, PageNow, nProduct) || [];

    for (const c of res.locals.lcCategories) {
        c.isActive = c.CatID === CatId;
    }

    const nPage = Math.ceil(await productModel.countProductByCat(CatId) / nProduct) || 1;

    let PageList = [];

    const prev = ({index: (+PageNow-1).toString(), disable: +PageNow === 1});
    for (let i = 1; i <= nPage; ++i) {
        PageList.push({index: i.toString(), active: (i.toString() === PageNow)})
    }
    const next = ({index: (+PageNow+1).toString(), disable: +PageNow === nPage});

    res.render('vwProduct/byCat', {
        layout: 'main',
        category: CatList,
        product: ProductList,
        page: PageList,
        prev: prev,
        next: next,
        empty: ProductList.length === 0
    });
});

router.get('/user/:id', function (req, res) {
    const userId = req.params.id || 0;
    const userInfo = userModel.findById(userId);

    res.render('vwBidder/info', {
        layout: 'main',
        userInfo: userInfo
    });
});

router.get('/search', async (req, res) => {
    const q = req.query.q;
    const f =  () => {
        if(req.query.filter === undefined){
            return ""
        }
        return req.query.filter;
    }
    const c = () => {
        if(req.query.CatName === undefined){
            return "";
        }
        return req.query.CatName;
    }
    const filter = f();
    const CatName = c();
    var prod;
    if (CatName.length > 0) {
        if(filter.length > 0){
            prod = await productModel.searchAndFilter(q, CatName, filter);
        }
        else {
            prod = await productModel.searchAnd(q, CatName);
        }
    }
    else if (filter.length > 0){
        prod = await productModel.searchOrFilter(q, filter);
    }
    else {
        prod = await productModel.searchOr(q);
    }
    
    await productModel.addDetail(prod);
    if (filter === "MaxPrice") {
        function compare(a, b) {
            if(a.Current_bid < b.Current_bid){
                return -1;
            }
            else if (a.Current_bid > b.Current_bid) {
                return 1;
            }
            return 0;
        }
        prod.sort(compare);
    }
    const CatId = req.query.CatID || 1;
    const nPage = Math.ceil(prod.length / 8) || 1;
    let PageNow = req.query.page || 1;
    let PageList = [];

    const prev = ({index: (+PageNow-1).toString(), disable: +PageNow === 1});
    for (let i = 1; i <= nPage; ++i) {
        PageList.push({index: i.toString(), active: (i.toString() === PageNow)})
    }
    const CatList = await categoryModel.findAllMain() || 0;
    for (let c of CatList) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }
    const next = ({index: (+PageNow+1).toString(), disable: +PageNow === nPage});
    for (const c of res.locals.lcCategories) {
        c.isActive = c.CatID === CatId;
    }
    res.render('vwProduct/search', {
        layout: 'main',
        category: CatList,
        related: prod,
        nPro: prod.length,
        page: PageList,
        prev: prev,
        next: next,
        q,
        filter,
        CatName
    })
})

export default router;