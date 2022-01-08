const db = require('../../db');
const { getAccessToken } = require('../../funcs/index');
module.exports = async (req, res) => {
  try {
    const verified = await getAccessToken(req, res);
    const writerEmail = verified.email;

    const sql =
      'SELECT id, title, reserved_at from mails WHERE writerEmail = ? ORDER BY reserved_at DESC';
    const params = [writerEmail];
    const [rows] = await db.query(sql, params);
    console.log(rows);
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
