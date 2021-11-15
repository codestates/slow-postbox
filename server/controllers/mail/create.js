const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { writerEmail, receiverEmail, title, content } = req.body;
    const sql =
      'INSERT INTO mails (writerEmail, receiverEmail, title, content) VALUES (?,?,?,?)';
    const params = [writerEmail, receiverEmail, title, content];
    const [row, fields, error] = await db.query(sql, params);

    if (error) {
      console.log(error);
    } else {
      return res.status(201).send('성공!');
    }
  } catch (err) {
    throw err;
  }
};
