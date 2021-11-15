const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const sql =
      'SELECT COUNT(id) AS count FROM mails WHERE reserved_at>DATE(NOW());';
    const [rows, fields, err] = await db.query(sql);
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).json({
        num: rows[0]['count'],
      });
    }
  } catch (err) {
    throw err;
  }
};
