import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('public/login');
});

router.get('/signup', (req, res) => {
  res.render('public/signup');
});

export default router;
