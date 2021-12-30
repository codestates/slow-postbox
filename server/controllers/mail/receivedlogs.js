const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const receiverEmail = req.query.receiverEmail;
    const sql =
      'SELECT id, title, reserved_at FROM mails WHERE receiverEmail = ? ORDER BY reserved_at DESC';
    const params = [receiverEmail];
    const [rows, fields, err] = await db.query(sql, params);

    if (err) {
      console.log(err);
      return res.status(404).send('실패');
    } else {
      return res.status(200).json({ data: rows });
    }
  } catch (err) {
    throw err;
  }
};
