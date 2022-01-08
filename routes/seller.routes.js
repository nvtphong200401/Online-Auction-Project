import express from "express";
import moment from "moment";
import multer from "multer";

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";
import commentModel from "../models/comment.model.js";
import bidModel from "../models/bid.model.js";

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/seller/product/list/active');
});
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

            const total = await productModel.countAllSellerActive(SID);
            let numPages = Math.floor(total / limit);
            if (total % limit > 0) numPages++;

            const pageNumbers = [];
            for (let i = 1; i <= numPages; i++) {
                pageNumbers.push({
                    value: i,
                    isCurrent: +page === i,
                });
            }

            const productList = await productModel.findSellerActivePage(SID, limit, offset);
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
                empty: productList.length === 0,
                isExSeller: res.locals.exSeller
            });
        }
    }
});
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
            for (const product of productList) {
                const cat = await categoryModel.findByPro(product.ProID);
                product.CatName = cat[0].CatName;
                product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
                product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
                if (product.Winner !== null) {
                    const winner = await userModel.findByID(product.Winner);
                    product.WinnerName = winner.Username;
                    product.hasWinner = true;
                    if (product.Winner === product.SID) {
                        product.winnerIsSeller = true;
                    } else {
                        product.winnerIsSeller = false;
                    }
                } else {
                    product.WinnerName = null;
                    product.hasWinner = false;
                    product.winnerIsSeller = false;
                }
            }
            res.render('vwSeller/sold', {
                layout: 'main',
                products: productList,
                pageNumbers,
                empty: productList.length === 0,
                isExSeller: res.locals.exSeller
            });
        }
    }
});
router.post('/review', async function (req, res) {
    const comment = {
        ID1: req.body.SID,
        ID2: req.body.Winner,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Score: +req.body.score,
        Opinion: req.body.review,
        ProID: req.body.ProID,
    }
    await commentModel.addComment(comment);
    res.redirect('/seller/product/list/sold');
});
router.post('/product/delete', async function (req, res) {
    const comment = {
        ID1: req.body.SID,
        ID2: req.body.Winner,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Score: 0,
        Opinion: 'Người thắng không thanh toán',
        ProID: req.body.ProID,
    }
    await productModel.del(comment.ProID);
    await commentModel.addComment(comment);
    // await bidModel.deleteBidHistory(winnerID, proID);
    // await bidModel.deleteBidSystem(winnerID, proID);
    res.redirect('/seller/product/list/sold');
});
router.post('/product/edit', async function (req, res) {
    //TODO: add maxLength js validation later
    const ProID = req.body.ProID;
    const product = await productModel.findById(ProID);
    var FullDesc = product[0].FullDesc;
    const today = moment().format('DD-MM-YYYY');
    FullDesc += today + '<br>' + req.body.FullDesc;
    await productModel.appendDescription(ProID, FullDesc);
    res.redirect('/seller/product/list/active');
});
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
            var maxLength = 0;
            if (product[0] !== undefined) {
                maxLength = 1000 - product[0].FullDesc.length;
            }
            res.render('vwSeller/edit', {
                layout: 'main',
                product: product[0],
                empty: product.length === 0,
                maxLength: maxLength
            });
        }
    }
});
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
        product.Status = 0;
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
});
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
            const catList = await categoryModel.findAllSubCat();
            res.render('vwSeller/add', {
                layout: 'main',
                catList: catList
            });
        }
    }
});
router.post('/deny_bidder', async function (req, res) {
    //TODO: send email to the banned user and pass the product to the 2nd highest bidder
    const BID = req.body.BID;
    const ProID = req.body.ProID;
    await userModel.denyUserOnProduct(BID, ProID);
    await bidModel.deleteBidHistory(BID, ProID);
    await bidModel.deleteBidSystem(BID, ProID);
    res.redirect('/product/' + ProID);
});
export default router;