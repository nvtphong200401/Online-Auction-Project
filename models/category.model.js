import db from '../utils/db.js';
import knex from "knex";

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
    async findAllWithDetails() {
        return db('c').count('p.ProID as ProductCount').from('category as c').leftJoin('product as p', 'c.CatID', 'p.CatId').groupBy('c.CatId', 'c.CatName');
    },
    findSubCat(id) {
        return db('category').where('CatParent','=', id);
    },
    findAllSubCat() {
        return db('category').whereNotNull('CatParent'); //.whereNull('CatParent');
    },
    deletable(id){
        return db('product').where('CatID','=',id);
    }
}