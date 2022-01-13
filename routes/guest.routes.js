import express, { query } from "express";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";
import commentModel from "../models/comment.model.js";
import auth from "../middleware/auth.mdware.js";


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
    let PageNow = req.params.page || "1";
    const CatList = await categoryModel.findAllMain() || 0;
    for (let c of CatList) {
        c.SubCat = await categoryModel.findSubCat(c.CatID);
    }
    const nProduct = 8;
    const ProductList = await productModel.findPageByCat(CatId, PageNow, nProduct) || [];

    let chosenCat;
    for (const c of res.locals.lcCategories) {
        for (const sub of c.SubCat) {
            c.isActive = +sub.CatID === +CatId
            if (c.isActive) {
                chosenCat = sub.CatName;
                break;
            }
        }
        if (!c.isActive) {
            c.isActive = c.CatID === +CatId;
            if (c.isActive) chosenCat = c.CatName;
        }
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
        chosenCat: chosenCat,
        product: ProductList,
        page: PageList,
        prev: prev,
        next: next,
        empty: ProductList.length === 0
    });
});

router.get('/user/:id', auth, async function (req, res) {

        // get comment
        const id = req.params.id || 0;

        if (+id === req.session.authUser.ID) {
            return res.redirect('/bidder/profile');
        }
        const userInfo = await userModel.findByID(id) || null;

        if (userInfo.length === null)
            return res.redirect('/unknown');
        const commentList = await commentModel.findComment(id, true, 1, 5)

        const nGoodComment = await commentModel.countGoodComment(id)
        const nBadComment = await commentModel.countBadComment(id)
        const nTotal = await commentModel.countComment(id)
        const overall = {
            'good': nGoodComment,
            'per_good': nTotal !== 0 ? (nGoodComment / nTotal * 100).toFixed(0) : 0,
            'bad': nBadComment,
            'per_bad': nTotal !== 0 ? (nBadComment / nTotal * 100).toFixed(0) : 0,
        }
        overall.total_per = nTotal !== 0 ? overall.per_good : null;
        overall.accept = overall.per_good > 80;

        res.render('vwBidder/profile_guest', {
            layout: 'main',
            userInfo,
            overall,
            commentList,
            empty: commentList.length === 0
        });
});

router.get('/search', async (req, res) => {
    const q = req.query.q;
    const f =  () => {
        if(req.query.filter === undefined){
            return "";
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
    let prod;
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
    if (filter === "Price") {
        function compare(a, b) {
            if(+a.Current_bid < +b.Current_bid){
                return -1;
            }
            else if (+a.Current_bid > +b.Current_bid) {
                return 1;
            }
            return 0;
        }
        prod.sort(compare);
    }
    let PageNow = req.query.page || "1";
    const nProduct = 8;
    const ProductList = prod.slice(nProduct * (+PageNow - 1), (nProduct * (+PageNow - 1)) + nProduct);

    const nPage = Math.ceil(prod.length / nProduct) || 1;
    let PageList = [];

    const prev = ({index: (+PageNow-1).toString(), disable: +PageNow === 1});
    for (let i = 1; i <= nPage; ++i) {
        PageList.push({index: i.toString(), active: (i.toString() === PageNow)})
    }

    const next = ({index: (+PageNow+1).toString(), disable: +PageNow === nPage});
    res.render('vwProduct/search', {
        layout: 'main',
        related: ProductList,
        nPro: prod.length,
        page: PageList,
        prev: prev,
        next: next,
        q,
        filter: filter.trim(),
        sortByPrice: filter === "Price",
        sortByDate: filter === "EndDate",
        CatName: CatName.trim(),
        empty: prod.length === 0
    })
})

export default router;