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