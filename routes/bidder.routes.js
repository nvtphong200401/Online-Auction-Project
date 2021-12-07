import express from "express";

const router = express.Router();

router.get('/request', function (req, res) {
    res.render('vwBidder/request', {
        layout: 'main'
    });
});

router.get('/', function (req, res) {
    res.render('vwBidder/profile', {
        layout: 'main'
    });
});

router.get('/profile', function (req, res) {
    res.render('vwBidder/profile', {
        layout: 'main'
    });
});

router.get('/watchlist', function (req, res) {
    res.render('vwBidder/watchlist', {
        layout: 'main'
    });
});

export default router;