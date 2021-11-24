import express from 'express';

const router = express.Router();

router.get('/', (req,res) => {
    res.render('auth/login', {layout: 'auth'})
})

// router.get('/register', (req, res) => {
//     res.render('auth/register', {layout: 'auth'})
// })

// router.get('/forgot', (req, res) => {
//     res.render('auth/forgot', {layout: 'auth'})
// })

export default router;