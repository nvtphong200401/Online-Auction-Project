import guestRoute from "../routes/guest.routes.js";
import authRoute from '../routes/auth_routes.js';
import adminRoute from '../routes/admin_routes.js';
import productRoute from '../routes/product.routes.js';
import bidderRoute from '../routes/bidder.routes.js';
import sellerRoute from '../routes/seller.routes.js'

export default function (app) {
    //use your route here

    // guestRoot
    app.use('/', guestRoute);


    app.use('/bidder', bidderRoute);// cái này xóa sau

    app.use('/product', productRoute);
    
    app.use('/auth', authRoute);

    app.use('/admin', adminRoute);

    app.use('/seller', sellerRoute);
    // 404 and 500 pages
    app.use(function (req, res, next) {
        res.render('404', { layout: false });
    });

    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.render('500', { layout: false });
    });
}
