const list = [
    { UserID: 1, UserName: 'Phong', UserEmail: 'hihi@gmail.com', role: true },
    { UserID: 2, UserName: 'Hieu', UserEmail: 'haha@gmail.com', role: false },
    { UserID: 3, UserName: 'Thu', UserEmail: 'hehe@gmail.com', role: true },
]


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
  }