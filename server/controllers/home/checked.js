const e = require('express');
const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(404).send();
    }
    const sql =
      'SELECT COUNT(id) AS count FROM mails WHERE (receiverEmail=? AND isChecked=0);';
    const params = [email];
    const [rows, fields, err] = await db.query(sql, params);
    if (err) {
      res.status(404).send();
    } else {
      res.status(200).json({
        isChecked: rows[0]['count'],
      });
    }
  } catch (err) {
    throw err;
  }
};
