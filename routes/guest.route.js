import express from "express";

import guestModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";


const router = express.Router();


router.get('/', function (req, res) {
    const top_end = guestModel.findTopEnd() || 0;
    const top_bid = guestModel.findTopBid() || 0;
    const top_price = guestModel.findTopPrice() || 0;
    const category = categoryModel.findAllMain() || 0;
    res.render('home', {
        layout: '../vwGuest/guest',
        category: category,
        top_end: top_end,
        top_bid: top_bid,
        top_price: top_price
    });
})

router.get('/user/:id', function (req, res){
    const userId = req.params.id || 0;
    const userInfo = userModel.findById(userId);

    //if (userInfo === null) {
    //   res.redirect('/');
    //}

    res.render('vwBider/info', {
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
        recent: guestModel.findTopBid(),
        related: guestModel.findTopPrice()
    })
})

export default router;