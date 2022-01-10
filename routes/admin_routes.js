import express from 'express';
import CatModel from '../models/category.model.js';
import UserModel from '../models/users_model.js';
import ProductModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';
import fs from 'fs';
import moment from 'moment';
import nodemailer from 'nodemailer';
const router = express.Router();
router.get('/', (req,res) => {
    res.redirect('/admin/category')
})
function sendEmail(email, message, title) {
    var email = email;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dragonslayers248@gmail.com',
            pass: 'matkhauvip'
        }
    });
    var mailOptions = {
        from: 'dragonslayers248@gmail.com',
        to: email,
        subject: title + ' - onlineauction.com',
        html: '<p>'+message+'</p>'

    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            return 1
        } else {
            return 0
        }
    });
}
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
    const subCat = await CatModel.findSubCat(req.params.id);
    for (const s of subCat) {
        await CatModel.del(s.CatID);
    }
    await CatModel.del(req.params.id);
})

router.get('/user', async (req, res) => {
    const filter = req.query.filter;
    var users;
    if (filter === 'Seller'){
        users = await UserModel.findByRole(1);
    }
    else if (filter === 'Bidder'){
        users = await UserModel.findByRole(0);
    }
    else {
        users = await UserModel.findAll();
    }
    res.render('admin/user', {
        users,
        layout: 'admin'
    });
})
router.post('/user/toBidder/:id', async (req, res) => {
    const user = await UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have been downgraded to be bidder !", "Admin");
    await UserModel.toBidder(req.params.id);

})
router.post('/user/toSeller/:id', async (req, res) => {
    const user = UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have been upgraded to be seller !", "Admin");
    await UserModel.toSeller(req.params.id);
})
router.put('/user/edit/:id', async (req, res) => {
    await UserModel.edit(req.params.id, req.body.Username, req.body.Email);
})
router.post('/user/del/:id', async (req, res) => {
    const user = await UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have violated our terms of policy so that we decided to ban your account !", "Admin");
    await UserModel.del(req.params.id);
})
router.post('/user/unban/:id', async (req, res) => {
    const user = await UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have been unbanned ! Thank you for your collaboration", "Admin");
    await UserModel.unban(req.params.id);
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
    const seller = await ProductModel.getSeller(req.params.id);
    sendEmail(seller[0].Email, "Your product has violated our terms of policy so that we decided to delete it !", "Admin");
    //remove folder and files
    const folder = "./public/imgs/sp/" + req.params.id + '/';
    const img_files = fs.readdirSync(folder);
    img_files.forEach((file) => {
        fs.unlink(folder + file, (err) => {
            if (err) throw err;
        });
    });
    fs.rmdir(folder, (err) => {
        if (err) throw err;
    });
    await ProductModel.del(req.params.id);
})
router.put('/category/edit/:id', async (req, res) => {
    await categoryModel.edit(req.params.id, req.body.CatName);
})
router.post('/category/add', async (req,res) => {
    await categoryModel.add(req.body.CatName);
    return res.redirect('/admin/category');
});
router.post('/category/:id/category/add', async (req,res) => {
    await categoryModel.addSub(req.params.id, req.body.CatName);
    return res.redirect('/admin/category/' + req.params.id + '/');
})
router.post('/pending/del/:id', async (req, res) => {
    const user = await UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have been rejected to be seller !", "Admin");
    await UserModel.reject(req.params.id);
})
router.post('/pending/approve/:id', async (req, res) => {
    const user = await UserModel.findByID(req.params.id);
    sendEmail(user.Email, "You have been approved to be seller !", "Admin");
    await UserModel.approve(req.params.id)
})

export default router;