import express from 'express';
import CatModel from '../models/categories_model.js';
import UserModel from '../models/users_model.js';

const router = express.Router();

router.get('/', (req,res) => {
    res.render('admin/manage_cat', {
        layout: 'admin', 
        cates : CatModel.findAll()
    })
})

router.get('/user', (req, res) => {
    res.render('admin/user', {
        users: UserModel.findAll(),
        layout: 'admin'});
})

router.get('/pending', (req, res) => {
    res.render('admin/pending', {
        users: UserModel.pending(),
        layout: 'admin'
    })
})

export default router;