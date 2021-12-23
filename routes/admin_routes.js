import express from 'express';
import CatModel from '../models/category.model.js';
import UserModel from '../models/users_model.js';
import ProductModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';
import moment from 'moment';
const router = express.Router();
router.get('/', (req,res) => {
    res.redirect('/admin/category')
})
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
    for (const i in list){
        const deletable = await CatModel.deletable(list[i].CatID);
        if (deletable.length > 0) {
            list[i]['deletable'] = true;
        }
    }
    res.render('admin/manage_cat', {
        layout: 'admin',
        cates: list,
        has_pre: true
    })
})

router.post('/category/del/:id', async (req, res) => {
    await CatModel.del(req.params.id);
})

router.get('/user', async (req, res) => {
    const users = await UserModel.findAll()
    res.render('admin/user', {
        users,
        layout: 'admin'
    });
})
router.post('/user/toBidder/:id', async (req, res) => {
    await UserModel.toBidder(req.params.id);

})
router.post('/user/toSeller/:id', async (req, res) => {
    await UserModel.toSeller(req.params.id);
})
router.put('/user/edit/:id', async (req, res) => {
    await UserModel.edit(req.params.id, req.body.Username, req.body.Email);
})
router.post('/user/del/:id', async (req, res) => {
    await UserModel.del(req.params.id);
})

router.get('/pending', async (req, res) => {
    const users = await UserModel.pending();
    
    res.render('admin/pending', {
        users,
        layout: 'admin'
    })
})

router.get('/product', async (req, res) => {
    const products = await ProductModel.findAll();
    for (const product of products) {
        product.UploadDate = moment(product.UploadDate).format('DD/MM/YYYY HH:mm:ss');
        product.EndDate = moment(product.EndDate).format('DD/MM/YYYY HH:mm:ss')
    }
    res.render('admin/manage_pro', {
        products,
        layout: 'admin'
    })
})
router.post('/product/del/:id', async (req, res) => {
    console.log(req.params.id);
    await ProductModel.del(req.params.id);
})
router.put('/category/edit/:id', async (req, res) => {
    await categoryModel.edit(req.params.id, req.body.CatName);
})
router.post('/category/add', async (req,res) => {
    await categoryModel.add(req.body.CatName);
    return res.redirect('/admin/category');
})
router.post('/pending/del/:id', async (req, res) => {
    await UserModel.reject(req.params.id);
})
router.post('/pending/approve/:id', async (req, res) => {
    await UserModel.approve(req.params.id)
})

export default router;