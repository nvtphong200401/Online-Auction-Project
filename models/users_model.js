import db from '../utils/db.js';
import commentModel from './comment.model.js';

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
        .del();
    },
  
    patch(entity) {
      const ID = entity.ID;
      delete entity.ID;
  
      return db('user')
        .where('ID', ID)
        .update(entity);
    },
    pending(){
      return db('user').where('Pending', 1);
    },
    reject(id) {
      return db('user').where('ID', id).update('Pending', 0)
    },
    approve(id){
      return db('user').where('ID', id).update({'Pending' : 0, 'Role' : 1})
    },
    toBidder(id) {
      return db('user').where('ID', id).update('Role', 0);
    },
    toSeller(id) {
      return db('user').where('ID', id).update('Role', 1);
    },
    getRole(id){
      return db.select('Role').from('user').where('ID', id);
    },
    edit(id, username, email) {
      return db('user').where('ID', id).update({'Username':username, 'Email':email});
    },
    getSellerByPro(id){
      return db.select('FullName').from('user').join('sale', 'user.ID', 'sale.SID').where({'Role' : 1, 'ProID' : id});
    },
    checkVerified(username){
      return db.select('Verified').from('user').where('Username', username);
    },
    setVerified(email){
      return db('user').where('Email', email).update('Verified', 1);
    },
    hasEmail(email){
      return db('user').where('Email', email);
    },
    setNewPassword(email, newPassword){
      return db('user').where('Email', email).update('Password', newPassword);
    },
    getAllScore(id){
      return db('user').join('comment', 'user.ID', 'comment.ID2').sum('comment.Score as score').where('ID', id);
    },
    getPercentScore(id){
      const sum = this.getAllScore(id);
      const total = commentModel.countComment(id);
      return (total - (total-sum)/2)/total;
    }
  }