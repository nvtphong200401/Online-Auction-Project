import categoryModel from '../models/category.model.js';

export default function (app) {
  app.use(function (req, res, next) {
    res.locals.lcCategories = categoryModel.findAllWithDetails();
    next();
  });
}