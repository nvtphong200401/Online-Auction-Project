import express from "express";
import moment from "moment";
import multer from "multer";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/seller/product/list/active');
})

router.get('/product/list/active', async function(req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.bidder) {
            res.redirect('/bidder/request');
        } else {
            const limit = 10;
            const page = req.query.page || 1;
            const offset = (page - 1) * limit;
            const SID = res.locals.authUser.ID;

            const total = await productModel.countAllActive(SID);
            let numPages = Math.floor(total / limit);
            if (total % limit > 0) numPages++;

            const pageNumbers = [];
            for (let i = 1; i <= numPages; i++) {
                pageNumbers.push({
                    value: i,
                    isCurrent: +page === i,
                });
            }

            const productList = await productModel.findActivePage(SID, limit, offset);
            for (const product of productList) {
                const cat = await categoryModel.findByPro(product.ProID);
                product.CatName = cat[0].CatName;
                const highestBid = await productModel.findHighestBID(product.ProID);
                if (highestBid === null) {
                    product.HighestBid = "None";
                } else {
                    product.HighestBid = highestBid.Price;
                }
                product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
                product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
            }
            res.render('vwSeller/active', {
                layout: 'main',
                products: productList,
                pageNumbers,
                isExSeller: res.locals.exSeller
            });
        }
    }
})

router.get('/product/list/sold', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.bidder) {
            res.redirect('/bidder/request');
        } else {
            const limit = 10;
            const page = req.query.page || 1;
            const offset = (page - 1) * limit;
            const SID = res.locals.authUser.ID;

            const total = await productModel.countAllSold(SID);
            let numPages = Math.floor(total / limit);
            if (total % limit > 0) numPages++;

            const pageNumbers = [];
            for (let i = 1; i <= numPages; i++) {
                pageNumbers.push({
                    value: i,
                    isCurrent: +page === i,
                });
            }

            const productList = await productModel.findSoldPage(SID, limit, offset);
            productList.forEach(async (product) => {
                const cat = await categoryModel.findByPro(product.ProID);
                product.CatName = cat[0].CatName;
                product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
                product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
            })
            res.render('vwSeller/sold', {
                layout: 'main',
                products: productList,
                pageNumbers,
                isExSeller: res.locals.exSeller
            });
        }
    }
})

router.post('/product/delete', async function (req, res) {
    await productModel.del(req.body.ProID);

    res.redirect('/seller/product/list/sold');
})

router.post('/product/edit', async function (req, res) {
    //TODO: add maxLength js validation later
    const ProID = req.body.ProID;
    const product = await productModel.findById(ProID);
    var FullDesc = product[0].FullDesc;
    const today = moment().format('DD-MM-YYYY');
    FullDesc += today + '<br>' + req.body.FullDesc;
    await productModel.appendDescription(ProID, FullDesc);
    res.redirect('/seller/product/list/active');
})

router.get('/product/edit', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.bidder) {
            res.redirect('/bidder/request');
        } else {
            const ProID = req.query.id || 0;
            const product = await productModel.findById(ProID);
            const maxLength = 1000 - product[0].FullDesc.length;
            res.render('vwSeller/edit', {
                layout: 'main',
                product: product[0],
                empty: product.length === 0,
                maxLength: maxLength
            });
        }
    }
})

router.post('/product/add',async function(req, res) {
    //TODO: add maxLength js validation later
    const maxProID = await productModel.findLastProID();
    const newProID = +maxProID + 1;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/imgs/sp/' + newProID);
        },
        filename: function (req, file, cb) {
            if (file.fieldname === 'thumbnail') {
                cb(null, 'main_thumbs.jpg');
            }
            if (file.fieldname === 'subImages') {
                cb(null, file.fieldname + '-' + Date.now() + '.jpg');
            }
        }
    })
    const upload = multer({storage: storage});
    upload.fields([{name: 'thumbnail', maxCount: 1}, {
        name: 'subImages',
        maxCount: 5
    }])(req, res, async function (err) {
        const product = req.body;
        product.SID = res.locals.authUser.ID;
        product.CatID = await categoryModel.findByCatName(product.CatName);
        product.ProID = newProID;
        delete product.CatName;

        if (product.AutoTime === undefined) {
            product.AutoTime = 0;
        }
        if (product.AllowAll === undefined) {
            product.AllowAll = 0;
        }
        await productModel.addProduct(product);
        if (err) {
            console.log(err);
        } else {
            res.redirect('/seller/product/list/active');
        }
    })
})

router.get('/product/add', async function(req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.bidder) {
            res.redirect('/bidder/request');
        } else {
            if (res.locals.exSeller) {
                res.redirect('/seller/product/list/active');
            } else {
                const catList = await categoryModel.findAllSubCat();
                res.render('vwSeller/add', {
                    layout: 'main',
                    catList: catList
                });
            }
        }
    }
})

router.get('/request', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.exSeller) {
            if (req.session.authUser.Pending) {
                res.render('vwBidder/waiting', {
                    layout: 'default'
                });
            } else {
                res.render('vwBidder/request', {
                    layout: 'default'
                });
            }
        } else {
            res.redirect('/seller/product/list/active');
        }
    }
})

export default router;