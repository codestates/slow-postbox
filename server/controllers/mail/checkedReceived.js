const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const sql = `UPDATE mails SET isChecked = 1 WHERE receiverEmail = '${email}' AND reserved_at<=DATE(NOW());`;
    const [rows, fields, err] = await db.query(sql);
    if (err) {
      return res.status(404).send();
    } else {
      return res.status(200).json();
    }
  } catch (err) {
    throw err;
  }
};
