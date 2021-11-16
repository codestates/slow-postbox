const db = require('../../db');

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const { writerEmail, receiverEmail, title, content, reserved_at } =
      req.body;
    const sql =
      'INSERT INTO mails (writerEmail, receiverEmail, title, content, reserved_at) VALUES (?,?,?,?,?)';
    const params = [writerEmail, receiverEmail, title, content, reserved_at];
    const [row, fields, error] = await db.query(sql, params);

    if (error) {
      console.log(error);
      return res.status(404).send('실패');
    } else {
      return res.status(201).send('성공!');
    }
  } catch (err) {
    throw err;
  }
};
