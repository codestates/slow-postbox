const {
  auth,
  duplication,
  kakaologin,
  login,
  logout,
  mailverify,
  modify,
  signup,
  withdraw,
  alertmail,
  getsalt,
  modifypw,
  kakaowithdraw,
} = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/auth', auth);
router.get('/duplication', duplication);
router.post('/kakaologin', kakaologin);
router.post('/login', login);
router.post('/getsalt', getsalt);
router.post('/logout', logout);
router.post('/mailverify', mailverify);
router.patch('/modify', modify);
router.post('/signup', signup);
router.delete('/withdraw', withdraw);
router.post('/alertmail', alertmail);
router.patch('/modifypw', modifypw);
router.delete('/kakaowithdraw', kakaowithdraw);
module.exports = router;
