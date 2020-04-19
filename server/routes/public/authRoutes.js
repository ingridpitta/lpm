import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('public/login');
});

router.get('/signup', (req, res) => {
  res.render('public/signup');
});

router.get('/signup-step/', (req, res) => {
  res.render('public/signup-step');
});

export default router;
