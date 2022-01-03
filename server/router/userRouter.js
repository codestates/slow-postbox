const {
  auth,
  duplication,
  kakaologin,
  login,
  logout,
  mailverify,
  info,
  signup,
  withdraw,
  alertmail,
  finduserinfo,
  kakaowithdraw,
} = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/auth', auth);
router.get('/duplication', duplication);
router.post('/kakaologin', kakaologin);
router.post('/login', login);
router.post('/logout', logout);
router.post('/mailverify', mailverify);
router.post('/finduserinfo', finduserinfo);
router.patch('/info', info);
router.post('/signup', signup);
router.delete('/withdraw', withdraw);
router.post('/alertmail', alertmail);
router.delete('/kakaowithdraw', kakaowithdraw);
module.exports = router;
