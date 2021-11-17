const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const writerEmail = req.query.writerEmail;
    const sql =
      'SELECT id, title, reserved_at from mails WHERE writerEmail = ? ORDER BY reserved_at';
    const params = [writerEmail];
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
