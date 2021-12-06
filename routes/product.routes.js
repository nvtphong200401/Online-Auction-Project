import express from "express";
import productModel from "../models/product.model.js";

const router = express.Router();

router.get('/detail', (req, res) => {
    res.render('vwGuest/detail', {layout: 'guest'})
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const obj = await productModel.findById(id);
    console.log(obj)
    res.render('vwGuest/detail', {
        layout: 'guest',
        product : obj[0]
    })
})


export default router;