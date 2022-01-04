const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { writerEmail, receiverEmail, content, reserved_at } = req.body;
    let { title } = req.body;
    if (
      writerEmail &&
      receiverEmail &&
      content &&
      reserved_at &&
      title.length >= 0
    ) {
      if (title.length === 0) {
        title = '(제목없음)';
      }

      const sql =
        'INSERT INTO mails (writerEmail, receiverEmail, title, content, reserved_at) VALUES (?,?,?,?,?)';
      const params = [writerEmail, receiverEmail, title, content, reserved_at];
      const [rows, fields] = await db.query(sql, params);

      return res.status(201).end();
    } else {
      return res.status(400).json({
        data: null,
        message: 'Insufficient body data',
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      path: '/',
      message: err.sqlMessage,
    });
  }
};
