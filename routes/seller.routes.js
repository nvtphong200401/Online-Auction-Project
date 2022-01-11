import express from "express";
import fs from 'fs';
import moment from "moment";
import multer from "multer";
import nodemailer from 'nodemailer';

import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import userModel from "../models/users_model.js";
import commentModel from "../models/comment.model.js";
import bidModel from "../models/bid.model.js";

const router = express.Router();

function sendEmail(email, message, title) {
    let mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dragonslayers248@gmail.com',
            pass: 'matkhauvip'
        }
    });
    let mailOptions = {
        from: 'dragonslayers248@gmail.com',
        to: email,
        subject: title + ' - onlineauction.com',
        html: '<p>' + message + '</p>'

    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            return 1
        } else {
            return 0
        }
    });
}

router.get('/', function (req, res) {
    res.redirect('/seller/product/list/active');
});
router.get('/product/list/active', async function (req, res) {
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
            let i = 1;
            for (const product of productList) {
                const cat = await categoryModel.findByPro(product.ProID);
                product.CatName = cat[0].CatName;
                product.ID = i++;
                const highestBid = await productModel.findHighestBID(product.ProID);
                if (highestBid === null) {
                    product.HighestBid = "None";
                } else {
                    product.HighestBid = highestBid.Price;
                    product.hasBid = true;
                }
            }
            res.render('vwSeller/active', {
                err_message: req.flash('add_fail'),
                layout: 'main',
                products: productList,
                pageNumbers,
                empty: productList.length === 0,
                isExSeller: res.locals.exSeller,
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
            let i = 1;
            for (const product of productList) {
                const cat = await categoryModel.findByPro(product.ProID);
                product.CatName = cat[0].CatName;
                product.ID = i++;
                if (product.Winner !== null) {
                    const winner = await userModel.findByID(product.Winner);
                    product.WinnerName = winner.Username;
                    product.hasWinner = true;
                    if (product.Winner === product.SID) {
                        product.winnerIsSeller = true;
                    } else {
                        product.winnerIsSeller = false;
                        product.isCommented = await commentModel.isCommented(product.SID, product.Winner, product.ProID);
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
    const folder = "./public/imgs/sp/" + comment.ProID + '/';
    const img_files = fs.readdirSync(folder);
    img_files.forEach((file) => {
        fs.unlink(folder + file, (err) => {
            if (err) throw err;
        });
    });
    fs.rmdir(folder, (err) => {
        if (err) throw err;
    });
    await productModel.del(comment.ProID);
    if (comment.ID2 !== '' && comment.ID2 !== comment.ID1) {
        await commentModel.addComment(comment);
    }
    res.redirect('/seller/product/list/sold');
});
router.post('/product/edit', async function (req, res) {
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
router.post('/product/add', async function (req, res) {
    const maxProID = await productModel.findLastProID();
    const newProID = +maxProID + 1;
    fs.mkdir('./public/imgs/sp/' + newProID, {recursive: true}, (err) => {
        if (err) throw err;
    });
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
        product.UploadDate = moment().format('YYYY-MM-DD HH:mm:ss');
        delete product.CatName;

        if (product.AutoTime === undefined) {
            product.AutoTime = 0;
        }
        if (product.AllowAll === undefined) {
            product.AllowAll = 0;
        }
        if (product.Buy_now === '') {
            product.Buy_now = null;
        }
        await productModel.addProduct(product);
        if (err) {
            console.log(err);
        } else {
            res.redirect('/seller/product/list/active');
        }
    })
});
router.get('/product/add', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else if (req.session.authUser.Role !== (await userModel.getRole(req.session.authUser.ID))[0].Role) {
        req.session.authUser.Role = (await userModel.getRole(req.session.authUser.ID))[0].Role;
        req.flash("add_fail", "Your seller account has expired")
        res.redirect('/seller/');
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
    const BID = req.body.BID;
    const ProID = req.body.ProID;
    const seller = await productModel.getSeller(ProID);
    const bidder = await userModel.findByID(BID);
    const product = await productModel.findById(ProID);
    await userModel.denyUserOnProduct(BID, ProID);
    await bidModel.deleteBidHistory(BID, ProID);
    await bidModel.deleteBidSystem(BID, ProID);
    sendEmail(bidder.Email, `Seller ${seller.FullName} has banned you on product ${product[0].ProName} !
                Go to <a href="http://localhost:3000/product/${product[0].ProID}">here</a> for more information!`, "Bid system")
    res.redirect('/product/' + ProID);
});
export default router;