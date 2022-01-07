const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const receiverEmail = req.query.receiverEmail;
    const sql =
      'SELECT id, title, reserved_at FROM mails WHERE receiverEmail = ? ORDER BY reserved_at DESC';
    const params = [receiverEmail];
    const [rows] = await db.query(sql, params);
    return res.status(200).json({ data: rows });
  } catch (err) {
    if (err instanceof ReferenceError) {
      return res.status(400).json({
        err: err.name,
        message: err.message,
      });
    } else {
      throw err;
    }
  }
};
