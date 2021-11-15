const {
  auth,
  duplication,
  kakaologin,
  login,
  logout,
  mailverify,
  modify,
  signup,
  withdraw
} = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/auth', auth);
router.get('/duplication', duplication);
router.post('/kakaologin', kakaologin);
router.post('/login', login);
router.post('/logout', logout);
router.post('/mailverify', mailverify);
router.patch('/modify', modify);
router.post('/signup', signup);
router.delete('withdraw', withdraw);

module.exports = router;