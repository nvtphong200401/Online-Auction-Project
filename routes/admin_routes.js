import express from 'express';
import CatModel from '../models/category.model.js';
import UserModel from '../models/users_model.js';
import ProductModel from '../models/product.model.js';

const router = express.Router();

router.get('/category', async (req,res) => {
    const list = await CatModel.findAllMain();
    // const deletable = await CatModel.deletable();
    res.render('admin/manage_cat', {
        layout: 'admin', 
        cates : list
    })
})
router.get('/category/:id', async (req, res) => {
    const list = await CatModel.findSubCat(req.params.id);
    res.render('admin/manage_cat', {
        layout:'admin',
        cates: list
    })
})

router.get('/user', async (req, res) => {
    const users = await UserModel.findAll()
    res.render('admin/user', {
        users,
        layout: 'admin'});
})

router.get('/pending', (req, res) => {
    res.render('admin/pending', {
        users: UserModel.pending(),
        layout: 'admin'
    })
})

router.get('/product', (req, res) => {
    const products = await ProductModel.findAll();
    res.render('admin/manage_pro', {
        products,
        layout: 'admin'
    })
})

export default router;