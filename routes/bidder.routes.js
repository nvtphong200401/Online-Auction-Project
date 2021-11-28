import express from "express";

const router = express.Router();

router.get('/request', function (req, res) {
    res.render('vwBidder/request', {
        layout: '../vwGuest/guest' // temporary layout; change into seller's layout when available
    });
});

export default router;