import express from "express";

const router = express.Router();

router.get('/request', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/request', {
            layout: 'default'
        });
    }
});

router.get('/', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/request', {
            layout: 'default'
        });
    }
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

router.get('/watchlist', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/watchlist', {
            layout: 'main'
        });
    }
});

export default router;