const { user, userList, mail, mailList } = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.get('/userList', userList);
router.delete('/user', user);
router.get('/mailList', mailList);
router.delete('/mail', mail);

module.exports = router;