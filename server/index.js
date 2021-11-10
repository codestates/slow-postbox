require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const homeRouter = require('./router/homeRouter');
const adminRouter = require('./router/adminRouter');
const mailRouter = require('./router/mailRouter');
const userRouter = require('./router/userRouter');

const app = express();

app.use(express.json({ strict: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  })
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.split('.');
    ext = ext[ext.length - 1];
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage: storage });

app.use(cookieParser());
app.use([express.static('public'), upload.array('files')]);

app.use('/home', homeRouter);
app.use('/admin', adminRouter);
app.use('/mail', mailRouter);
app.use('/user', userRouter);

const PORT = 4000;

let server = app.listen(PORT, () =>
  console.log(`🚀 Server is starting on ${PORT}`)
);

module.exports = server;
