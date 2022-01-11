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
    addProduct(product) {
        return db('product').insert(product);
    },
    appendDescription(ProID, NewDesc) {
        return db('product').where('ProID', '=', ProID).update({
            FullDesc: NewDesc
        })
    },
    async findLastProID() {
        const maxProID = await db('product').max('ProID as id').first();
        return maxProID.id;
    },
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
    findAll() {
        return db('product');
    },
    findSoldPage(SID, limit, offset) {
        return db('product').where('Status', 1)
            .andWhere('SID', SID)
            .limit(limit).offset(offset);
    },
    findBidderActivePage(BID, limit, offset) {
        return db('bid_system').innerJoin('product', 'bid_system.ProID', 'product.ProID')
            .where('bid_system.BID', BID).andWhere('product.Status', 0)
            .limit(limit).offset(offset);
    },
    findSellerActivePage(SID, limit, offset) {
        return db('product').where('Status', 0)
            .andWhere('SID', SID)
            .limit(limit).offset(offset);
    },
    findWonPage(BID, limit, offset) {
        return db('product').where('Winner', BID).limit(limit).offset(offset);
    },
    async countAllWon(BID) {
        const total = await db('product').where('Winner', BID)
            .count({count: '*'});
        return total[0].count;
    },
    async countAllSold(SID) {
        const total = await db('product').where('Status', 1)
            .andWhere('SID', SID)
            .count({count: '*'});
        return total[0].count;
    },
    async countAllBidderActive(BID) {
        const total = await db('bid_system').innerJoin('product', 'bid_system.ProID', 'product.ProID')
            .where('bid_system.BID', BID).andWhere('product.Status', 0)
            .count({count: '*'});
        return total[0].count;
    },
    async countAllSellerActive(SID) {
        const total = await db('product').where('Status', 0)
            .andWhere('SID', SID)
            .count({count: '*'});
        return total[0].count;
    },
    async countProductByCat(CatID) {
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db.count('p.ProID as amount').from('product as p')
            .rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            });
        return list[0].amount;
    },
    async findPageByCat(CatID, page, limit) {
        const off = (page - 1) * limit;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const list = await db('product').from('product as p')
            .rightJoin('category as c', 'p.CatID', 'c.CatID')
            .where('EndDate', '>', today).andWhere(function () {
                this.where('p.CatID', '=', CatID)
                    .orWhere('c.CatParent', '=', CatID);
            }).limit(limit).offset(off);

        await this.addDetail(list);

        return list;
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
    getStartPrice(ProID){
        return db.select('Start_price as Price').from('product').where('ProID', '=', ProID)
    },
    async getCurrentBid(ProID) {
        const price_user = await db.max("Price as Price").from("bid_history")
            .where('ProID', '=', ProID);
        let current_bid = price_user[0].Price;

        if (current_bid === null) {
            const initial_price = await this.getStartPrice(ProID);
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
        const list = await db.select('p.*').count('bd.BID as BidNumber')
            .from('product as p')
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
        return db('product').where('SID', id).count({p: '*'});
    },
    async proSameCat(catID, proID){
        const list = await db('product').whereRaw(`CatID = ${catID} AND ProID != ${proID}`).orderByRaw('RAND()').limit(5)
        await this.addDetail(list);
        return list;
    },
    searchOr(query){
        return db('product').join('category as c1', 'product.CatID', 'c1.CatID').join('category as c2', 'c2.CatID', 'c1.CatParent')
            .whereRaw(`MATCH(product.ProName) AGAINST(N'${query}') OR MATCH(c1.CatName) AGAINST(N'${query}') OR MATCH(c2.CatName) AGAINST(N'${query}') AND product.EndDate > NOW()`);
    },
    searchAnd(query, catName){
        return db('product').join('category as c1', 'product.CatID', 'c1.CatID').join('category as c2', 'c2.CatID', 'c1.CatParent')
            .whereRaw(`(MATCH(product.ProName) AGAINST('${query}') OR MATCH(c1.CatName) AGAINST(N'${query}') OR MATCH(c2.CatName) AGAINST(N'${query}')) AND (c1.CatName = '${catName}' OR c2.CatName = '${catName}') product.EndDate > NOW()`);
    },
    searchAndFilter(query, catName, filter){
        return db('product').distinct('product.ProID', 'product.ProName', 'product.UploadDate', 'product.EndDate', 'product.Buy_now').join('category as c1', 'product.CatID', 'c1.CatID').join('category as c2', 'c2.CatID', 'c1.CatParent')
            .join('bid_history', 'product.ProID', 'bid_history.ProID')
            .whereRaw(`(MATCH(product.ProName) AGAINST('${query}') OR MATCH(c1.CatName) AGAINST(N'${query}') OR MATCH(c2.CatName) AGAINST(N'${query}')) AND (c1.CatName = '${catName}' OR c2.CatName = '${catName}') product.EndDate > NOW()`).orderBy(filter);
    },
    searchOrFilter(query, filter){
        if (filter === "EndDate"){
            return db('product').join('category as c1', 'product.CatID', 'c1.CatID').join('category as c2', 'c2.CatID', 'c1.CatParent')
                .whereRaw(`MATCH(product.ProName) AGAINST(N'${query}') OR MATCH(c1.CatName) AGAINST(N'${query}') OR MATCH(c2.CatName) AGAINST(N'${query}') product.EndDate > NOW()`).orderBy(filter ,'asc');
        }
        return db('bid_history').distinct('product.ProID', 'product.ProName', 'product.UploadDate', 'product.EndDate', 'product.Buy_now').rightJoin('product', 'product.ProID', 'bid_history.ProID')
        .join('category as c1', 'product.CatID', 'c1.CatID').join('category as c2', 'c2.CatID', 'c1.CatParent')
            .whereRaw(`MATCH(product.ProName) AGAINST(N'${query}') OR MATCH(c1.CatName) AGAINST(N'${query}') OR MATCH(c2.CatName) AGAINST(N'${query}') product.EndDate > NOW()`).orderBy(filter);
    },
    getSeller(ProID){
        return db('user').join('product', 'product.SID', 'user.ID').whereRaw(`user.Role > 0 and product.ProID = ${ProID}`);
    },
    updateEndTime(ProID, EndDate){
        return db('product').where('ProID', ProID).update('EndDate', EndDate);
    },
    addWinner(BID, ProID) {
        return db('product').where('ProID', ProID).update('Winner', BID);
    },
    setSold(ProID) {
        return db('product').where('ProID', ProID).update('Status', 1);
    },
    findCurrentBid(BID, ProID) {
        return db.select('MaxPrice').from('bid_system').where('ProID', ProID).andWhere('BID', BID);
    },
    getWinner(ProID){
        return db('user').join('product', 'user.ID', 'product.winner').where('ProID', ProID);
    },
    buyNow(ProID, BID){
        return db('product').where('ProID', ProID).update({'EndDate': moment().format('YYYY-MM-DD HH:mm:ss'), 'Winner' : BID});
    }
}