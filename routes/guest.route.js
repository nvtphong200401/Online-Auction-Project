import express from "express";

import guestModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

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

export default router;