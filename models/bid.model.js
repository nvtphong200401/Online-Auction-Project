import db from '../utils/db.js';
import productModel from './product.model.js';
import moment from 'moment';
async function autoUpdate(ProID) {
    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const step = await db.select('Step_price').from('product').where('ProID', ProID);
    const top2 = await db('bid_system').where('ProID', ProID).orderBy('MaxPrice', 'desc').limit(2);
    const top2_history_old = await db('bid_history').where('ProID', ProID).orderBy('Price', 'desc').limit(2);
    // if there is only one
    if (top2.length < 2) {
        // the bid would be start_price + step price
        // add it to bid history
        const start_price = await productModel.getStartPrice(ProID);
        try {
            await db('bid_history').insert({
                'BID': top2[0].BID,
                'Price': parseInt(start_price[0].Price) + parseInt(step[0].Step_price) > top2[0].MaxPrice ? top2[0].MaxPrice : parseInt(start_price[0].Price) + parseInt(step[0].Step_price),
                'ProID': ProID,
                'Time': today
            })
        } catch (error) {
            
        }
        return;
    }
    
    // const history = await db('bid_history').where({BID, ProID});
    // // is it already in bid_history ?
    // if (history.length < 0) {
        //     // update bid history
        //     await db('bid_history').insert({'BID': BID, 'Price': parseInt(top2[1].MaxPrice), 'ProID': ProID, 'Time': today});
        // }
        //update bid history
        try {
            await db('bid_history').insert({
                'BID': top2[1].BID,
                'Price': parseInt(top2[1].MaxPrice),
                'ProID': ProID
            })
        } catch (error) {
            await db('bid_history').where({
                'BID': top2[1].BID,
                'ProID': ProID
            }).update({'Price': parseInt(top2[1].MaxPrice)});
        }
        try {
            await db('bid_history').insert({
                'BID': top2[0].BID,
                'Price': parseInt(top2[1].MaxPrice) + parseInt(step[0].Step_price) > top2[0].MaxPrice ? top2[0].MaxPrice : parseInt(top2[1].MaxPrice) + parseInt(step[0].Step_price),
                'ProID': ProID
            })
        } catch (error) {
            await db('bid_history').where({
                'BID': top2[0].BID,
                'ProID': ProID
            }).update({'Price': parseInt(top2[1].MaxPrice) + parseInt(step[0].Step_price) > top2[0].MaxPrice ? top2[0].MaxPrice : parseInt(top2[1].MaxPrice) + parseInt(step[0].Step_price)});
        }
        const top2_history_curr = await db('bid_history').where('ProID', ProID).orderBy('Price', 'desc').limit(2);
        // something changed
        if (top2_history_old[1].BID  !== top2_history_curr[1].BID && top2_history_old[1].Price  !== top2_history_curr[1].Price) {
            await db('bid_history').where({
                'BID': top2[0].BID,
                'ProID': ProID
            }).update('Time', today);
            await db('bid_history').where({
                'BID': top2[1].BID,
                'ProID': ProID
            }).update('Time', today);
        }
}
export default {
    getHistoryByPro(id) {
        return db('bid_history').join('user', 'ID', 'bid_history.BID').where('ProID', id);
    },
    async addBid(BID, ProID, MaxPrice) {
        //add to bid system
        await db('bid_system').insert({BID, ProID, MaxPrice});
        await autoUpdate(ProID);
    },
    getTop2(ProID) {
        return db('bid_system').where('ProID', ProID).orderBy('MaxPrice', 'desc').limit(2);
    },
    async updateBid(BID, ProID, MaxPrice) {
        await db('bid_system').where({'BID': BID, 'ProID': ProID}).update('MaxPrice', MaxPrice);
        await autoUpdate(ProID);
    },
    findBid(BID, ProID) {
        return db('bid_system').where({BID, ProID});
    },
    deleteBidHistory(BID, ProID) {
        return db('bid_history').where('BID', BID).andWhere('ProID', ProID).del();
    },
    deleteBidSystem(BID, ProID) {
        return db('bid_system').where('BID', BID).andWhere('ProID', ProID).del();
    }
}