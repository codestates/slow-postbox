const { user, userList, mail, mailList } = require('../controllers/admin');
const express = require('express');
const router = express.Router();

router.get('/user-list', userList);
router.delete('/user', user);
router.get('/mail-list', mailList);
router.delete('/mail', mail);

module.exports = router;