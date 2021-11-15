const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { writerEmail, receiverEmail, title, content } = req.body;
    const sql =
      'INSERT INTO mails (writerEmail, receiverEmail, title, content) VALUES (?,?,?,?)';
    const params = [writerEmail, receiver, title, content];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      else {
        return res.status(201).end();
      }
    });
  } catch (err) {
    throw err;
  }
};
