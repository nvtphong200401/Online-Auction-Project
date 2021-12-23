import db from '../utils/db.js';
import productModel from './product.model.js';
import moment from 'moment';
export default {
    getHistoryByPro(id){
        return db('bid_history').join('user', 'ID', 'bid_history.BID').where('ProID', id);
    },
    async addBid(BID, ProID, MaxPrice){
        //add to bid system
        await db('bid_system').insert({BID,ProID,MaxPrice});
        const step = await db.select('Step_price').from('sale').where('ProID', ProID)[0] || 10000;
        const today = moment().format('YYYY-MM-DD HH:mm:ss');
        const top2 = await db('bid_system').orderBy('MaxPrice').limit(2);
        console.log(top2);
        // if there is only one
        if(top2.length < 2){
            // the bid would be start_price + step price
            // add it to bid history
            const start_price = await productModel.getStartPrice(ProID);
            console.log(parseInt(start_price[0].Price) + step);
            return await db('bid_history').insert({'BID': BID, 'Price': parseInt(start_price[0].Price) + step, 'ProID': ProID, 'Time': today})
        }
        // is it already in bid_history ?
        const history = await db('bid_history').where({BID, ProID});
        if(history != null){
            // update bid history
            return await db('bid_history').where({BID,ProID}).update({'Price': top2[1].MaxPrice + step, 'Time': today})
        }
        
            //insert to bid history
        return await db('bid_history').insert({'BID': BID, 'Price': top2[1].MaxPrice + step, 'ProID': ProID, 'Time': today});
    },
    getTop(){
        return db('bid_system').orderBy('MaxPrice').limit(1);
    }
}