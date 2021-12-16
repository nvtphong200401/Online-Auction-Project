import knex from 'knex';
import moment from 'moment';

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
    checkNew(ProList) {
        for (let x in ProList) {
            let distance = untilNow(ProList[x].UploadDate);
            ProList[x].New = distance > 0 && distance < 45 * OneMin;
        }
        return ProList;
    },
    // If there is no "special" condition, pls add this function before return the product(s)
    async addDetail(ProList) {
        for (let p of ProList) {
            p.Current_bid = await this.getCurrentBid(p.ProID);
            p.BidNumber = await this.countBidNumber(p.ProID);
            p.HighestBID = await this.findHighestBID(p.ProID);
        }
        this.checkNew(ProList);
    },
    async findAll() {
        return db('product');
    },
    async findActivePage(limit, offset) {
        const now = moment(new Date()).format("YYYY/MM/DD HH:mm:ss");
        return db('product').where('EndDate', '>', now).limit(limit).offset(offset);
    },
    async findPage(limit, offset) {
        return db('product').limit(limit).offset(offset);
    },
    async countAll() {
        const total= await db('product').count({count: '*'});
        return total[0].count;
    },
    async countAllActive() {
        const now = moment.now();
        const total = await db('product').where('EndDate', '>', now).count({count: '*'});
        return total[0].count;
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

        await this.addDetail(list);

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

    async findBidHistory(ProID) {
        return db.select('*').from('bid_history')
            .join('user', 'BID', 'ID')
            .where('ProID', '=', ProID)
            .orderBy('Price', "desc");
    },

    async getCurrentBid(ProID) {
        const price_user = await db.max("Price as Price").from("bid_history")
            .where('ProID', '=', ProID);
        let current_bid = price_user[0].Price;

        if (current_bid === null) {
            const initial_price = await db.select('Start_price as Price').from('product').where('ProID', '=', ProID);
            current_bid = initial_price[0].Price;
        }
        return current_bid;
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

        await this.addDetail(list);
        return list;
    },

    async findTopBid() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.select('p.*').count('bd.BID as BidNumber').from('product as p')
            .leftJoin('bid_history as bd', 'p.ProID', 'bd.ProID')
            .where('EndDate', '>', today)
            .groupBy('p.ProID', 'p.ProName')
            .orderBy('BidNumber', 'desc').limit(5);

        await this.addDetail(list);
        return list;
    },

    async findTopPrice() {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        let list = await db.select('*').from('product as p');
        await this.addDetail(list);

        if (list != null) {
            list = list.sort((a,b) => { return b.Current_bid - a.Current_bid }).slice(0, 5); // get top 5 current bid products
        }
        return list;
    },

    async findById(id){
        const list = await db('product').where('ProID', '=', id);
        await this.addDetail(list);
        return list
    },
    del(id) {
        return db('product').where('ProID', '=', id).del();
    },
    countAllByUser(id){
        return db('product').join('sale', 'sale.ProID', 'product.ProID').sum('product as p').where('SID', id)
    },
    proSameCat(catID, proID){
        return db('product').whereRaw(`CatID = ${catID} AND ProID != ${proID}`).orderByRaw('RAND()').limit(5)
    },
    searchOr(query){
        return db('product').join('category', 'product.CatID', 'category.CatID').whereRaw(`MATCH(product.ProName) AGAINST('${query}') OR MATCH(category.CatName) AGAINST('${query}')`);
    },
    searchAnd(proName, catName){
        return db('product').join('category', 'product.CatID', 'category.CatID').whereRaw(`MATCH(ProName) AGAINST('${proName}') AND CatName = '${catName}'`);
    },
    searchAndFilter(proName, catName, filter){
        return db('product').join('category', 'category.CatID', 'product.CatID').join('bid_system', 'product.ProID', 'bid_system.ProID').whereRaw(`MATCH(ProName) AGAINST('${proName}') AND CatName = '${catName}'`).orderBy(filter);
    },
    searchOrFilter(query, filter){
        if (filter === "EndDate"){
            return db('product').join('category', 'product.CatID', 'category.CatID').whereRaw(`MATCH(ProName) AGAINST('${query}') OR MATCH(CatName) AGAINST('${query}')`).orderBy(filter ,'desc');
        }
        return db('bid_system').rightJoin('product', 'product.ProID', 'bid_system.ProID').join('category', 'product.CatID', 'category.CatID').whereRaw(`MATCH(ProName) AGAINST('${query}') OR MATCH(CatName) AGAINST('${query}')`).orderBy(filter);
    }
}