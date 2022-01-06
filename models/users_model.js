import db from '../utils/db.js';
import commentModel from './comment.model.js';
import moment from "moment";

export default {
    findAll() {
        return db('user');
    },
    async findByID(ID) {
        const list = await db('user').where('ID', ID);
        if (list.length === 0)
            return null;

        return list[0];
    },
    findByRole(role){
        return db('user').where('Role', role);
    },
    findByEmail(email){
        return db('user').where('Email', email);
    },

    async findByUsername(username) {
        const list = await db('user').where('Username', username);
        if (list.length === 0)
            return null;

        return list[0];
    },

    add(entity) {
        return db('user').insert(entity);
    },

    del(ID) {
        return db('user')
            .where('ID', ID)
            .update('isBanned', 1);
    },

    patch(entity) {
        const ID = entity.ID;
        delete entity.ID;

        return db('user')
            .where('ID', ID)
            .update(entity);
    },
    pending() {
        return db('user').where('Pending', 1);
    },
    reject(id) {
        return db('user').where('ID', id).update('Pending', 0)
    },
    approve(id) {
        return db('user').where('ID', id).update({'Pending': 0, 'Role': 1})
    },
    toBidder(id) {
        return db('user').where('ID', id).update('Role', 0);
    },
    toSeller(id) {
        return db('user').where('ID', id).update('Role', 1);
    },
    getRole(id) {
        return db.select('Role').from('user').where('ID', id);
    },
    edit(id, username, email) {
        return db('user').where('ID', id).update({'Username': username, 'Email': email});
    },
    editUsername(id, username) {
        return db('user').where('ID', id).update({'Username': username});
    },
    editEmail(id, email) {
        return db('user').where('ID', id).update({'Email': email, 'Verified': 0});
    },
    editName(id, name) {
        return db('user').where('ID', id).update({'FullName': name});
    },
    editDob(id, dob) {
        return db('user').where('ID', id).update({'DOB': moment(dob, "L").toISOString()});
    },
    //TODO: Phong pls check if this is your desired result
    getSellerByPro(id) {
        return db.select('FullName').from('user').join('product', 'user.ID', 'product.SID').where('ProID', id);
        //return db.select('FullName').from('user').join('sale', 'user.ID', 'sale.SID').where({'Role': 1, 'ProID': id});
    },
    checkVerified(username) {
        return db.select('Verified').from('user').where('Username', username);
    },
    setVerified(email) {
        return db('user').where('Email', email).update('Verified', 1);
    },
    hasEmail(email) {
        return db('user').where('Email', email);
    },
    setNewPassword(email, newPassword) {
        return db('user').where('Email', email).update('Password', newPassword);
    },
    setPending(id) {
        return db('user').where('ID', id).update('Pending', true);
    },
    // 2 functions below are now available in comment.model.js :)
    getAllScore(id) {
        return db('user').join('comment', 'user.ID', 'comment.ID2').sum('comment.Score as score').where('ID', id);
    },
    getPercentScore(id){
      const sum = this.getAllScore(id);
      const total = commentModel.countComment(id);
      return (total - (total-sum)/2)/total;
    },
    unban(id){
        return db('user').where('ID', id).update('isBanned', 0);
    },
    addFbUser(user){
        return db('fbUser').insert(user);
    },
    findFbById(id){
        return db('fbuser').where('facebookId', id);
    }
}