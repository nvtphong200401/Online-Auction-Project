import express from 'express';
import CatModel from '../models/category.model.js';
import UserModel from '../models/users_model.js';
import ProductModel from '../models/product.model.js';

const router = express.Router();

router.get('/category', async (req, res) => {
    const list = await CatModel.findAllMain();
    for (const i in list) {
        const sublist = await CatModel.findSubCat(list[i].CatID);
        sublist.forEach(async (subCat) => {
            const deletable = await CatModel.deletable(subCat.CatID);
            if (deletable.length > 0) {
                list[i]['deletable'] = true;
            }
        });
    }

    res.render('admin/manage_cat', {
        layout: 'admin',
        cates: list
    })
})
router.get('/category/:id', async (req, res) => {
    const list = await CatModel.findSubCat(req.params.id);
    res.render('admin/manage_cat', {
        layout: 'admin',
        cates: list,
        has_pre: true
    })
})

router.post('/category/del/:id', (req, res) => {
    console.log(req.params.id);
})

router.get('/user', async (req, res) => {
    const users = await UserModel.findAll()
    res.render('admin/user', {
        users,
        layout: 'admin'
    });
})

router.get('/pending', (req, res) => {
    res.render('admin/pending', {
        users: UserModel.pending(),
        layout: 'admin'
    })
})

router.get('/product', async (req, res) => {
    const products = await ProductModel.findAll();
    res.render('admin/manage_pro', {
        products,
        layout: 'admin'
    })
})
router.post('/product/del/:id', (req, res) => {
    console.log(req.params.id);
})
router.put('/category/edit/:id', (req, res) => {
    console.log(req.body);
})

export default router;