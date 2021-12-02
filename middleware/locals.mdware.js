import categoryModel from '../models/category.model.js';
import productModel from '../models/product.model.js';

export default function (app) {
  app.use(async function (req, res, next) {
    res.locals.lcCategories = await categoryModel.findAllMain();
    for (let cat of res.locals.lcCategories) {
      cat.SubCat = await categoryModel.findSubCat(cat.CatID);
      for (let sub of cat.SubCat) {
        sub.ProductCount = await productModel.countProductByCat(sub.CatID);
      }
    }
    next();
  });
}