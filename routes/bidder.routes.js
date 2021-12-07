import express from "express";

const router = express.Router();

router.get('/request', function (req, res) {
    res.render('vwBidder/request', {
        layout: 'main' // temporary layout; change into seller's layout when available
    });
});

router.get('/', function (req, res) {
    res.render('vwBidder/profile', {
        layout: 'bidder' // temporary layout; change into seller's layout when available
    });
});

router.get('/profile', function (req, res) {
    res.render('vwBidder/profile', {
        layout: 'bidder' // temporary layout; change into seller's layout when available
    });
});

router.get('/watchlist', function (req, res) {
    res.render('vwBidder/watchlist', {
        layout: 'bidder' // temporary layout; change into seller's layout when available
    });
});

export default router;