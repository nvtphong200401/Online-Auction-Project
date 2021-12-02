import express from "express";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";


const router = express.Router();


router.get('/', async function (req, res) {
    const top_end = productModel.findTopEnd() || 0;
    const top_bid = productModel.findTopBid() || 0;
    const top_price = productModel.findTopPrice() || 0;
    const category = await categoryModel.findAllMain() || 0;
    for (let c of category) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }

    res.render('home', {
        layout: '../vwGuest/guest',
        category: category,
        top_end: top_end,
        top_bid: top_bid,
        top_price: top_price
    });
});

router.get('/byCat/:id/:page', async function (req, res) {
    const CatId = req.params.id || 0;
    let PageNow = req.params.page || 1;
    const CatList = await categoryModel.findAllMain() || 0;
    for (let c of CatList) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }
    const ProductList = await productModel.findByCat(CatId) || 0;

    const ListByPage= productModel.splitList(ProductList, 12); // 12 products per page

    if (ListByPage.length === 0 || PageNow > ListByPage.length)
        PageNow = 1;

    for (const c of res.locals.lcCategories) {
        c.isActive = c.CatID === CatId;
    }

    const chosenProduct = ListByPage[PageNow - 1] || [];
    const nPage = ListByPage.length || 1;
    let PageList = [];

    for (let i = 1; i <= nPage; ++i) {
        PageList.push({ index: i.toString(), active: (i.toString() === PageNow)})
    }

    res.render('vwGuest/byCat', {
        layout: '../vwGuest/guest',
        category: CatList,
        product: chosenProduct,
        page: PageList,
        empty: chosenProduct.length === 0
    });
});

router.get('/user/:id', function (req, res){
    const userId = req.params.id || 0;
    const userInfo = userModel.findById(userId);

    //if (userInfo === null) {
    //   res.redirect('/');
    //}

    res.render('vwBidder/info', {
       layout: '../vwGuest/guest',
       userInfo: userInfo
    });
});

router.get('/search', (req, res) => {
    const q = req.query.q;
    //perform sql search here

    // assume that we receive
    // all category match to the keywords
    // product in N mins related to keywords
    // product related to keyword but not in N mins
    res.render('vwGuest/search', {
        layout: '../vwGuest/guest',
        category : categoryModel.findAllMain() || 0,
        recent: productModel.findTopBid().slice(0, 4),
        related: productModel.findTopPrice()
    })
})

export default router;