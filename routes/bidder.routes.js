import express from "express";
import userModel from '../models/users_model.js';
import commentModel from '../models/comment.model.js'
import productModel from '../models/product.model.js'
const router = express.Router();

router.get('/request', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (req.session.authUser.Pending) {
            res.render('vwBidder/waiting', {
                layout: 'default'
            });
        }
        else {
            res.render('vwBidder/request', {
                layout: 'default'
            });
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
            'per_good': nTotal !== 0 ? (nGoodComment / nTotal * 100) : 0,
            'bad': nBadComment,
            'per_bad': nTotal !== 0 ? (nBadComment / nTotal * 100) : 0,
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
            layout: 'main'
        });
    }
});

router.get('/profile/reset-password', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/changepassword', {
            layout: 'main'
        });
    }
});

export default router;