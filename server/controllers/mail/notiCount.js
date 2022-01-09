const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.query;
    const sql = `SELECT COUNT(id) AS count FROM mails WHERE receiverEmail = '${email}' AND reserved_at>DATE(NOW()) AND isChecked=0;`;
    const [rows] = await db.query(sql);

    return res.status(200).json({ count: rows[0]['count'] });

  } catch (err) {
    throw err;
  }
};
