import db from '../utils/db.js';

export default {

    findAllMain() {
        return db('category').whereNull('CatParent');
    },
    countAllMain(){
        return db('category').count('CatID');
    },
    findPage(limit, offset) {
        return db('category').limit(limit).offset(offset);
    },
    findSubCat(id) {
        return db('category').where('CatParent','=', id);
    },
    findAllSubCat() {
        return db('category').whereNotNull('CatParent'); //.whereNull('CatParent');
    },
    findByPro(id){
        return db.select('CatName').from('category').join('product', 'category.CatID', 'product.CatID').where('ProID', id);
    },
    deletable(id){
        return db('product').where('CatID','=',id);
    },
    del(id){
        return db('category').where('CatID','=',id ).del();
    },
    edit(id, new_name){
        return db('category').where('CatID','=',id).update('CatName', new_name);
    },
    add(CatName){
        return db('category').insert({CatName});
    }
}