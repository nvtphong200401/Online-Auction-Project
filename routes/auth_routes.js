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
    res.redirect('/');
})
router.get('/is-available', async function (req, res) {
  const username = req.query.user;
  const user = await userModel.findByUsername(username);
  if (user === null) {
    return res.json(true);
  }

  res.json(false);
});

export default router;