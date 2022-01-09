const { total, checked } = require('../controllers/home');
const express = require('express');
const router = express.Router();

router.get('/', total);
router.get('/checked-mail', checked)

module.exports = router;
