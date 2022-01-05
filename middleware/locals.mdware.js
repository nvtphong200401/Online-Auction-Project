import categoryModel from '../models/category.model.js';
import productModel from '../models/product.model.js';
import cartModel from '../models/cart.model.js';

export default function (app) {
  app.use(async function (req, res, next) {

    if (typeof (req.session.auth) === 'undefined') {
      req.session.auth = false;
    }

    if (req.session.auth === false) {
      req.session.cart = [];
    }

    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    if (req.session.auth === true) {
      res.locals.bidder = req.session.authUser.Role === 0;
      res.locals.seller = req.session.authUser.Role === 1;
      res.locals.admin = req.session.authUser.Role === 2;
      res.locals.exSeller = req.session.authUser.Role === 3;
    }
    app.locals.success = req.flash('success');
    app.locals.warning = req.flash('warning');
    next();
  });
  app.use(async function (req, res, next) {
    res.locals.lcCategories = await categoryModel.findAllMain();
    for (let cat of res.locals.lcCategories) {
      cat.SubCat = await categoryModel.findSubCat(cat.CatID);
      for (let sub of cat.SubCat) {
        sub.ProductCount = await productModel.countProductByCat(sub.CatID);
        sub.q = req.query.q;
      }
    }
    next();
  });

  app.use(async function (req, res, next) {

    if (typeof (req.session.auth) === 'undefined') {
      req.session.auth = false;
    }

    if (req.session.auth === false) {
      req.session.cart = [];
    }

    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    res.locals.cartSummary = cartModel.getNumberOfItems(req.session.cart);

    next();
  });

}