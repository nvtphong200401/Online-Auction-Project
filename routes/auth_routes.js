import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import userModel from '../models/users_model.js';
import verifyModel from '../models/verif.model.js';
import randToken from 'rand-token';
import nodemailer from 'nodemailer';

const router = express.Router();

function sendEmail(email, token) {
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dragonslayers248@gmail.com',
      pass: 'matkhauvip'
    }
  });
  var mailOptions = {
    from: 'dragonslayers248@gmail.com',
    to: email,
    subject: 'Email verification - onlineauction.com',
    html: '<p>You requested for email verification, kindly use this <a href="http://localhost:3000/auth/verify-email?token=' + token + '">link</a> to verify your email address</p>'

  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      return 1
    } else {
      return 0
    }
  });
}

router.post('/sendverify', async (req, res) => {
  const token = await verifyModel.getVerification(req.body.Email);
  if(token.length > 0) {
    sendEmail(req.body.Email, token[0].token);
  }
  req.flash("success", "Please check verification in your email");
  res.redirect('/auth');
})

router.get('/verify-email', async (req, res) => {
  var type = 'success';
  var msg = 'Your email has been verify';
  const result = await verifyModel.verify_email(req.query.token);

    if(result.length > 0){
      await userModel.setVerified(result[0].email);
      await verifyModel.removeToken(result[0].email);
    } else {
      type = 'success';
      msg = 'The email has already been verified';
    }
  req.flash(type, msg);
  res.redirect('/auth/');
})

router.get('/', (req, res) => {
  res.render('auth/login', { layout: 'auth' })
})


router.post('/', async (req, res) => {
  const form = req.body;
  if (form.action === 'Register') {
    const rawPassword = form.password;
    const salt = bcrypt.genSaltSync(10);
    const Password = bcrypt.hashSync(rawPassword, salt);
    const DOB = moment(form.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const Fullname = form.fullname;
    const Email = form.email;
    const Username = form.username;
    const user = {
      Username,
      Fullname,
      Password,
      DOB,
      Email
    };
    const token = randToken.generate(20);
    const verification = {
      email: Email,
      token: token,
      verify: 0
    }
    await userModel.add(user);
    const t = await verifyModel.add(verification);
    const sent = sendEmail(Email, token);
    var type = 'success';
    var msg = 'Email already verified';
    if (sent == 0){
      type = 'success';
      msg = 'The verification link has been sent to your email address';
    }else {
      type = 'error';
      msg = 'Something goes wrong';
    }
    req.flash(type, msg);
    res.redirect('/auth/');
  }
  //Login
  else if (form.action === 'Login') {
    const user = await userModel.findByUsername(req.body.username);
    if (user === null) {
      return res.render('auth/login', {
        layout: 'auth',
        err_message: 'Invalid username or password.'
      });
    }
    //Check verified account
    const verify = await userModel.checkVerified(req.body.username);
    if(verify[0].Verified == 0){
      return res.render('auth/login', {
        err_message: 'Your email has not been verified.',
        re_verify: true,
        layout: 'auth'
      })
    }

    const ret = bcrypt.compareSync(req.body.password, user.Password);
    if (ret === false) {
      return res.render('auth/login', {
        err_message: 'Invalid username or password.',
        layout: 'auth'
      })
    }
    delete user.Password;

    req.session.auth = true;
    req.session.authUser = user;
    const url = req.session.retUrl || '/';
    res.redirect(url);
  }
})
router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
});
router.post('/logout', (req, res) => {
  req.session.auth = false;
  req.session.authUser = null;
  const url = req.headers.referer || '/';
  res.redirect(url);
})


router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;
  req.session.cart = [];

  const url = req.headers.referer || '/';
  res.redirect(url);
});


export default router;