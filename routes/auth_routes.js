import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import userModel from '../models/users_model.js'

const router = express.Router();

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
        }
        await userModel.add(user);
    }
    //Login
    else if (form.action === 'Login'){
      const user = await userModel.findByUsername(req.body.username);
      if (user===null){
        return res.render('auth/login', {
          layout: 'auth',
          err_message: 'Invalid username or password.'
        });
      }
      const ret = bcrypt.compareSync(req.body.password, user.Password);
      if(ret === false){
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