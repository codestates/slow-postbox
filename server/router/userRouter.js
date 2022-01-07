const {
  auth,
  kakaologin,
  login,
  logout,
  emailVerification,
  info,
  signup,
  withdrawal,
  reservationNotice,
  finduserinfo,
  kakaoWithdrawal,
  guest,
} = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/auth', auth);
router.post('/kakaologin', kakaologin);
router.post('/login', login);
router.post('/logout', logout);
router.post('/emailVerification', emailVerification);
router.post('/finduserinfo', finduserinfo);
router.patch('/info', info);
router.post('/signup', signup);
router.delete('/withdrawal', withdrawal);
router.post('/reservationNotice', reservationNotice);
router.delete('/kakaoWithdrawal', kakaoWithdrawal);
router.post('/guest', guest);
module.exports = router;
