import express from "express";

import guestModel from "../models/guest.model.js";
import categoryModel from "../models/category.model.js";
const router = express.Router();


router.get('/', function (req, res) {
    const top_end = guestModel.findTopEnd();
    console.log(top_end);
    const top_bid = guestModel.findTopBid();
    const top_price = guestModel.findTopPrice();
    const category = categoryModel.findAllMain();
    res.render('home', {
        layout: '../vwGuest/guest',
        category: category,
        top_end: top_end,
        top_bid: top_bid,
        top_price: top_price
    });
})

export default router;