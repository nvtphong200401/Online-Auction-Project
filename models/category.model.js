import db from '../utils/db.js';

const list = [
    { CatID: "1", CatName: "Sneakers"},
    { CatID: "2", CatName: "StreetWear"},
    { CatID: "3", CatName: "Electronics"},
    { CatID: "4", CatName: "Trading Cards"},
    { CatID: "5", CatName: "Collectibles"},
    { CatID: "6", CatName: "Handbags"},
    { CatID: "7", CatName: "Watches"},
    { CatID: "8", CatName: "Toys"},
    { CatID: "9", CatName: "Devices"},
];
export default {

    findAllMain() {
        return db('category').whereNull('CatParent');
    },
    findAllWithDetails() {
        for (let x in list){
            list[x].ProductCount = "20";
        }
        return list;
    },
    findSubCat(id) {
        return db('category').where('CatParent','=', id);
    },
    deletable(id){
        
    }
}