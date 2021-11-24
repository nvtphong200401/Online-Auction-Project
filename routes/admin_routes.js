import express from 'express';

const router = express.Router();

router.get('/', (req,res) => {
    res.render('admin/manage_cat')
})

export default router;