require('dotenv').config();
const schedule = require('node-schedule');
const db = require('./db');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const MultipartyMiddleware = multipart({ uploadDir: './images' });
const path = require('path');
const fs = require('fs');
const homeRouter = require('./router/homeRouter');
const adminRouter = require('./router/adminRouter');
const mailRouter = require('./router/mailRouter');
const userRouter = require('./router/userRouter');
const app = express();
const { getDateStr } = require('../client/src/funcs/dateFuncs');
const { arrivalAlert } = require('./funcs/index');

const rule = new schedule.RecurrenceRule();
rule.hour = 22;
rule.minute = 6;

schedule.scheduleJob(rule, async function sendAlertMail() {
  const realTime = getDateStr(new Date());
  try {
    console.log('it works');
    //유저이름, 전송날짜를 joined 테이블에서 받아온다
    //조인 기준은 users.mail = mails.writerEmail
    const sql = `SELECT users.name, mails.created_at, mails.receiverEmail FROM mails INNER JOIN users ON users.email=mails.writerEmail WHERE reserved_at=?`;
    const [rows, fields, error] = await db.query(sql, [realTime]);
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        arrivalAlert(
          rows[i]['name'],
          rows[i]['receiverEmail'],
          rows[i]['created_at']
        );
        console.log('sending alert mail');
      }
    }
  } catch (error) {
    throw error;
  }
});

app.use(express.json({ strict: false }));
app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'https://slow-postbox.com',
      'https://www.slow-postbox.com',
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  })
);

app.use(cookieParser());

app.use(express.static('uploads'));
app.post('/uploads', MultipartyMiddleware, (req, res) => {
  if (req.files.upload.size > 15 * 1024 * 1024) {
    alert('error');
    return;
  }
  const tempFile = req.files.upload;
  const tempPathfile = tempFile.path;

  const targetPathUrl = path.join(__dirname, './uploads/' + tempFile.name);
  if (
    path.extname(tempFile.originalFilename).toLowerCase() === '.png' ||
    '.jpg'
  ) {
    fs.rename(tempPathfile, targetPathUrl, (err) => {
      res.status(200).json({
        uploaded: true,
        url: `${process.env.REACT_APP_SERVER_API}/${tempFile.originalFilename}`,
      });
      if (err) return console.log(err);
    });
  }
});

app.use('/', homeRouter);
app.use('/admin', adminRouter);
app.use('/mails', mailRouter);
app.use('/users', userRouter);

const PORT = 4000;

//const PORT = 80;

let server = app.listen(PORT, () =>
  console.log(`🚀 Server is starting on ${PORT}`)
);

module.exports = server;
