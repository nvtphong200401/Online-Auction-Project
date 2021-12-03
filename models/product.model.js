import moment from 'moment';

const interval = function (begin, end) {
    let beginTime = new Date(begin).getTime();
    let endTime = new Date(end).getTime();
    return endTime - beginTime;
}

function untilNow(begin) {
    let now = new Date().getTime();
    let beginTime = new Date(begin).getTime();

    return now - beginTime;
}

const OneSec = 1000;
const OneMin = 1000 * 60;
const OneHour = 1000 * 60 * 60;
const OneDay = 1000 * 60 * 60 * 24;

import db from '../utils/db.js';

export default {
    // If there is no "special" condition, pls add checkNew
    // and check the EndDate when you get list of products
    checkNew(ProList) {
        for (let x in ProList) {
            let distance = untilNow(ProList[x].UploadDate);
            ProList[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return ProList;
    },
    findAll() {
        return db('product');
    },
    async countProductByCat(CatID) {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.count('p.ProID as amount').from('product as p').rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            });
        return list[0].amount;
    },
    async findPageByCat(CatID, page, limit) {
        const off = (page - 1) * limit;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db('product').from('product as p').rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            }).limit(limit).offset(off);

        for (let p of list) {
            p.BidNumber = await this.countBidNumber(p.ProID);
            p.HighestBID = await this.findHighestBID(p.ProID);
        }

        this.checkNew(list);

        return list;
    },

    findByCat(CatID) {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db('product').from('product as p').rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            });
    },

    async countBidNumber(ProID) {
        const res = await db.count('BID as BidNumber').from('bid_history')
            .where('ProID', '=', ProID);
        return res[0].BidNumber || 0;
    },

    findBidHistory(ProID) {
        return db.select('*').from('bid_history')
            .join('user', 'BID', 'ID')
            .where('ProID', '=', ProID)
            .orderBy('Price', "desc");
    },

    async findHighestBID(ProID) {
        const list = await this.findBidHistory(ProID);
        return list[0] || null;
    },

    async findTopEnd() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.select('*').from('product')
            .where('EndDate', '>', today)
            .orderBy('EndDate').limit(5);

        for (let p of list) {
            p.BidNumber = await this.countBidNumber(p.ProID);
            p.HighestBID = await this.findHighestBID(p.ProID);
        }

        this.checkNew(list);

        return list;
    },

    async findTopBid() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.select('p.*').count('bd.BID as BidNumber').from('product as p')
            .leftJoin('bid_history as bd', 'p.ProID', 'bd.ProID')
            .where('EndDate', '>', today)
            .groupBy('p.ProID', 'p.ProName')
            .orderBy('BidNumber', 'desc').limit(5);

        for (let p of list) {
            p.BidNumber = await this.countBidNumber(p.ProID);
            p.HighestBID = await this.findHighestBID(p.ProID);
        }

        this.checkNew(list);

        return list;
    },

    async findTopPrice() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.select('*').from('product')
            .where('EndDate', '>', today)
            .orderBy('Current_bid', 'desc').limit(5);

        for (let p of list) {
            p.BidNumber = await this.countBidNumber(p.ProID);
            p.HighestBID = await this.findHighestBID(p.ProID);
        }

        this.checkNew(list);

        return list;
    }
}