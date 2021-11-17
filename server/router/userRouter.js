const {
  auth,
  duplication,
  kakaologin,
  login,
  logout,
  mailverify,
  modify,
  modifypw,
  signup,
  withdraw,
  alertmail,
  finduserinfo,

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
router.patch('/modify', modify);
router.patch('/modifypw', modifypw);
router.post('/signup', signup);
router.delete('/withdraw', withdraw);
router.post('/alertmail', alertmail);
module.exports = router;
