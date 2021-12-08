import db from '../utils/db.js';

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
    }
  }