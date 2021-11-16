const {
  getReceive,
  getReserved,
  getSent,
  getReservedSent,
  patchReceive,
  patchReserved,
  patchSent,
  viewReceive,
  viewSent,
  create,
  receivedlogs,
  sentlogs,
  getPaginatedMails,
} = require('../controllers/mail');
const express = require('express');
const router = express.Router();

router.get('/receive', getReceive);
router.get('/reserved', getReserved);
router.patch('/reserved', patchReserved);
router.get('/receive/:mailsid', viewReceive);
router.patch('/receive', patchReceive);
router.get('/sent', getSent);
router.get('/reservedsent', getReservedSent);
router.get('/sent/:mailsid', viewSent);
router.patch('/sent', patchSent);
router.post('/create', create);
router.get('/receivedlogs', receivedlogs);
router.get('/sentlogs', sentlogs);
router.get('/getpaginatedmail', getPaginatedMails);

module.exports = router;
