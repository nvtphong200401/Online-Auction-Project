import express from "express";
import userModel from '../models/users_model.js';
import commentModel from '../models/comment.model.js'
import bcrypt from "bcryptjs";
import moment from "moment";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
const router = express.Router();

router.get('/request', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (res.locals.bidder || res.locals.exSeller) {
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
            res.redirect('/seller/');
        }
    }
});
router.post('/request', async function (req, res) {
    const id = req.session.authUser.ID;
    req.session.authUser.Pending = true;
    await userModel.setPending(id);

    const url = req.headers.referer || '/';
    res.redirect(url);
});
router.get('/profile', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        // get comment
        const id = res.locals.authUser.ID;
        const commentList = await commentModel.findComment(id, true, 1, 5)

        const nGoodComment = await commentModel.countGoodComment(id)
        const nBadComment = await commentModel.countBadComment(id)
        const nTotal = await commentModel.countComment(id)
        const overall = {
            'good': nGoodComment,
            'per_good': nTotal !== 0 ? (nGoodComment / nTotal * 100).toFixed(0) : 0,
            'bad': nBadComment,
            'per_bad': nTotal !== 0 ? (nBadComment / nTotal * 100).toFixed(0) : 0,
        }
        overall.total_per = nTotal !== 0 ? overall.per_good : null;
        overall.accept = overall.per_good > 80;

        res.render('vwBidder/profile', {
            layout: 'main',
            overall,
            commentList
        });
    }
});
router.get('/profile/edit', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/edit', {
            err_email: req.flash('email_fail'),
            err_username: req.flash('username_fail'),
            layout: 'main'
        });
    }
});
router.post('/profile/edit', async function (req, res) {
    const user = await userModel.findByUsername(res.locals.authUser.Username);
    delete user.Password;

    const handleString = function (str) {
        return str.replace(/\s+/g, ' ').trim()
    }

    const email = handleString(req.body.email);
    const username = handleString(req.body.username);
    const name = handleString(req.body.name);
    const dob = req.body.dob;

    if (email !== res.locals.authUser.Email) {
        const data = await userModel.findByEmail(email);
        if (data.length === 0) {
            await userModel.editEmail(user.ID, email);
            res.locals.authUser.Email = email;
        }
        else {
            req.flash("email_fail", "Email " + email + " has already been used");
            res.redirect('/bidder/profile/edit');
            return;
        }
    }
    if (username !== res.locals.authUser.Username) {
        const data = await userModel.findByUsername(username);
        console.log(data)
        if (data === null) {
            await userModel.editUsername(user.ID, username);
            res.locals.authUser.Username = username;
        }
        else {
            req.flash("username_fail", "Username " + username + " has already been used");
            res.redirect('/bidder/profile/edit');
            return;
        }
    }
    if (name !== res.locals.authUser.FullName) {
        await userModel.editName(user.ID, name);
        res.locals.authUser.FullName = name;
    }
    if (dob !== moment(res.locals.authUser.DOB,"L").toISOString()) {
        await userModel.editDob(user.ID, dob);
        res.locals.authUser.DOB = moment(dob, "L").toISOString();
    }
    res.redirect('/bidder/profile/edit');
});
router.get('/profile/reset-password', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/changepassword', {
            err_message: req.flash('fail'),
            layout: 'main'
        });
    }
});
router.post('/profile/reset-password', async function (req, res) {
    const user = await userModel.findByUsername(res.locals.authUser.Username);
    const ret = bcrypt.compareSync(req.body.old_pass, user.Password);
    if (ret === false) {
        req.flash("fail", "Incorrect password");
        res.redirect('/bidder/profile/reset-password');
        return;
    }
    delete user.Password;

    const email = res.locals.authUser.Email;
    const rawPassword = req.body.pass;
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(rawPassword, salt);
    await userModel.setNewPassword(email, newPassword);

    req.session.auth = false;
    req.session.authUser = null;
    req.session.cart = [];

    req.flash("success", "Please use new password to continue");
    res.redirect('/auth')
});
router.get('/product/list/won', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        const limit = 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;
        const BID = res.locals.authUser.ID;

        const total = await productModel.countAllWon(BID);
        let numPages = Math.floor(total / limit);
        if (total % limit > 0) numPages++;

        const pageNumbers = [];
        for (let i = 1; i <= numPages; i++) {
            pageNumbers.push({
                value: i,
                isCurrent: +page === i,
            });
        }

        const productList = await productModel.findWonPage(BID, limit, offset);
        for (const product of productList) {
            const cat = await categoryModel.findByPro(product.ProID);
            product.CatName = cat[0].CatName;
            product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
            product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
            const seller = await userModel.findByID(product.SID);
            const price = await productModel.findHighestBID(product.ProID);
            product.Price = price.Price;
            product.SellerName = seller.Username;
            if (product.Winner === product.SID) {
                product.winnerIsSeller = true;
            } else {
                product.winnerIsSeller = false;
                product.isCommented = await commentModel.isCommented(product.Winner, product.SID, product.ProID);
            }
        }
        res.render('vwBidder/won', {
            layout: 'main',
            products: productList,
            pageNumbers,
            empty: productList.length === 0
        });
    }
});
router.post('/review', async function (req, res) {
    const comment = {
        ID1: req.body.Winner,
        ID2: req.body.SID,
        Date: moment().format('YYYY-MM-DD HH:mm:ss'),
        Score: +req.body.score,
        Opinion: req.body.review,
        ProID: req.body.ProID,
    }
    await commentModel.addComment(comment);
    res.redirect('/bidder/product/list/won');
});
router.get('/product/list/active', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        const limit = 10;
        const page = req.query.page || 1;
        const offset = (page - 1) * limit;
        const BID = res.locals.authUser.ID;

        const total = await productModel.countAllBidderActive(BID);
        let numPages = Math.floor(total / limit);
        if (total % limit > 0) numPages++;

        const pageNumbers = [];
        for (let i = 1; i <= numPages; i++) {
            pageNumbers.push({
                value: i,
                isCurrent: +page === i,
            });
        }

        const productList = await productModel.findBidderActivePage(BID, limit, offset);
        for (const product of productList) {
            const cat = await categoryModel.findByPro(product.ProID);
            product.CatName = cat[0].CatName;
            const highestBid = await productModel.findHighestBID(product.ProID);
            const currentBid = await productModel.findCurrentBid(BID, product.ProID);
            product.CurrentBid = currentBid[0].MaxPrice;
            if (highestBid === null) {
                product.HighestBid = "None";
            } else {
                product.HighestBid = highestBid.Price;
            }
            product.UploadDate = moment(product.UploadDate).format("DD/MM/YYYY HH:mm:ss");
            product.EndDate = moment(product.EndDate).format("DD/MM/YYYY HH:mm:ss");
        }
        res.render('vwBidder/active', {
            layout: 'main',
            products: productList,
            pageNumbers,
            empty: productList.length === 0,
        });
    }
});
export default router;