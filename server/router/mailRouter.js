const {
  received,
  receivedReservation,
  sent,
  getReservedSent,
  reservedCheck,
  viewReceived,
  viewSent,
  create,
  receivedlogs,
  sentlogs,
  getPaginatedMails,
  notiCount,
  checkedReceived,
  email
} = require('../controllers/mail');
const express = require('express');
const router = express.Router();


router.get('/received', received); // 파일명 변경 받은메일함
router.get('/receivedReservation', receivedReservation); //도착예정함_
router.get('/sent', sent); // 보낸메일함
router.get('/reservedsent', getReservedSent);//전달예정함
router.patch('/reserved/notiCheck', reservedCheck); // api 수정, 파일명 변경
router.get('/viewSent/:mailsid', viewSent); // api경로수정
router.get('/viewReceived/:mailsid', viewReceived); // api수정 파일명 변경
router.post('/create', create);
router.get('/receivedlogs', receivedlogs);
router.get('/sentlogs', sentlogs);
router.get('/getpaginatedmail', getPaginatedMails);
router.get('/notiCount', notiCount); //api 수정 
router.patch('/checked-received', checkedReceived)
router.patch('/email', email) // email 경로 추가 , 파일명 변경
// router.patch('/sent', patchSent); // 삭제
// router.patch('/receive', patchReceive); // 삭제


module.exports = router;
