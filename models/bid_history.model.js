import db from '../utils/db.js';

export default {
    getHistoryByPro(id){
        return db('bid_history').join('user', 'ID', 'bid_history.BID').where('ProID', id);
    }

}