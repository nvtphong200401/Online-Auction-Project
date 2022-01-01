import express from "express";
import userModel from '../models/users_model.js';
import commentModel from '../models/comment.model.js'
import productModel from '../models/product.model.js'
import bcrypt from "bcryptjs";
import moment from "moment";
const router = express.Router();

router.get('/request', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        if (req.session.authUser.Pending) {
            res.render('vwBidder/waiting', {
                layout: 'default'
            });
        }
        else {
            res.render('vwBidder/request', {
                layout: 'default'
            });
        }
    }
});

router.post('/request', async function (req, res) {
    const id = req.session.authUser.ID;
    req.session.authUser.Pending = true;
    await userModel.setPending(id);

    const url = req.headers.referer || '/';
    res.redirect(url);
});

router.get('/profile', async function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        // get comment
        const id = res.locals.authUser.ID;
        const commentList = await commentModel.findComment(id, true, 1, 5)

        const nGoodComment = await commentModel.countGoodComment(id)
        const nBadComment = await commentModel.countBadComment(id)
        const nTotal = await commentModel.countComment(id)
        const overall = {
            'good': nGoodComment,
            'per_good': nTotal !== 0 ? (nGoodComment / nTotal * 100) : 0,
            'bad': nBadComment,
            'per_bad': nTotal !== 0 ? (nBadComment / nTotal * 100) : 0,
        }
        overall.total_per = nTotal !== 0 ? overall.per_good : null;
        overall.accept = overall.per_good > 80;

        res.render('vwBidder/profile', {
            layout: 'main',
            overall,
            commentList
        });
    }
});

router.get('/profile/edit', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/edit', {
            err_email: req.flash('email_fail'),
            err_username: req.flash('username_fail'),
            layout: 'main'
        });
    }
});
router.post('/profile/edit', async function (req, res) {
    const user = await userModel.findByUsername(res.locals.authUser.Username);
    delete user.Password;

    const handleString = function (str) {
        return str.replace(/\s+/g, ' ').trim()
    }

    const email = handleString(req.body.email);
    const username = handleString(req.body.username);
    const name = handleString(req.body.name);
    const dob = req.body.dob;

    if (email !== res.locals.authUser.Email) {
        const data = await userModel.findByEmail(email);
        if (data.length === 0) {
            await userModel.editEmail(user.ID, email);
            res.locals.authUser.Email = email;
        }
        else {
            req.flash("email_fail", "Email " + email + " has already been used");
            res.redirect('/bidder/profile/edit');
            return;
        }
    }
    if (username !== res.locals.authUser.Username) {
        const data = await userModel.findByUsername(username);
        console.log(data)
        if (data === null) {
            await userModel.editUsername(user.ID, username);
            res.locals.authUser.Username = username;
        }
        else {
            req.flash("username_fail", "Username " + username + " has already been used");
            res.redirect('/bidder/profile/edit');
            return;
        }
    }
    if (name !== res.locals.authUser.FullName) {
        await userModel.editName(user.ID, name);
        res.locals.authUser.FullName = name;
    }
    if (dob !== moment(res.locals.authUser.DOB).calendar()) {
        await userModel.editDob(user.ID, dob);
        console.log(res.locals.authUser.DOB)
        res.locals.authUser.DOB = moment(dob, "L").toISOString();
        console.log(res.locals.authUser.DOB)
    }
    res.redirect('/bidder/profile/edit');
});
router.get('/profile/reset-password', function (req, res) {
    if (typeof (req.session.auth) === 'undefined') {
        req.session.auth = false;
    }
    if (req.session.auth === false) {
        res.redirect('/auth');
    } else {
        res.render('vwBidder/changepassword', {
            err_message: req.flash('fail'),
            layout: 'main'
        });
    }
});
router.post('/profile/reset-password', async function (req, res) {
    const user = await userModel.findByUsername(res.locals.authUser.Username);
    const ret = bcrypt.compareSync(req.body.old_pass, user.Password);
    if (ret === false) {
        req.flash("fail", "Incorrect password");
        res.redirect('/bidder/profile/reset-password');
        return;
    }
    delete user.Password;

    const email = res.locals.authUser.Email;
    const rawPassword = req.body.pass;
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(rawPassword, salt);
    await userModel.setNewPassword(email, newPassword);

    req.session.auth = false;
    req.session.authUser = null;
    req.session.cart = [];

    req.flash("success", "Please use new password to continue");
    res.redirect('/auth')
});
export default router;