import db from '../utils/db.js';

export default {
    add(entity){
        return db('verifications').insert(entity);
    },
    getVerification(email){
        return db('verifications').where('email', email);
    },
    updateVerification(email, token){
        return db('verifications').where('email', email).update('token', token);
    },
    verify_email(token){
        return db('verifications').where('token', token);
    },
    removeToken(email){
        return db('verifications').where('email', email).del();
    }
}