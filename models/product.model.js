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
    findPageByCat(CatID, page, limit) {
        const off = (page - 1) * limit;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db('product').from('product as p').rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            }).limit(limit).offset(off);
    },
    findByCat(CatID) {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db('product').from('product as p').rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            });
    },
    findTopEnd() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db.select('*').from('product')
            .where('EndDate', '>', today)
            .orderBy('EndDate').limit(5);
    },

    findTopBid() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db.select('*').from('product')
            .where('EndDate', '>', today)
            .orderBy('BidNumber', 'desc').limit(5);
    },

    findTopPrice() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        return db.select('*').from('product')
            .where('EndDate', '>', today)
            .orderBy('Current_bid', 'desc').limit(5);
    }
}