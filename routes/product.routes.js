import express from "express";
import productModel from "../models/product.model.js";

const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('vwGuest/detail', {layout: '../vwGuest/guest'})
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const obj = productModel.findTopBid();
    console.log(obj[1].ProID)
    res.render('vwGuest/detail', {
        layout: '../vwGuest/guest',
        product : obj[id-1]
    })
})


export default router;