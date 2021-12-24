import express from "express";
import userModel from '../models/users_model.js';
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

router.get('/profile', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/profile', {
            layout: 'main'
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