const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const sql =
      'SELECT COUNT(id) AS count FROM mails WHERE reserved_at>DATE(NOW());';
    const [rows] = await db.query(sql);
      res.status(200).json({
        num: rows[0]['count'],
    })
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
