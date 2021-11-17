const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { receiverEmail, writerEmail, page } = req.query;
    if (!receiverEmail && !writerEmail) {
      const sql1 =
        'SELECT id, writerEmail, receiverEmail, reserved_at, isRead, created_at FROM mails ORDER BY id LIMIT ?,10;';
      const params = [(Number(page) - 1) * 10];
      const [rows1, fields1, err1] = await db.query(sql1, params);
      if (err1) {
        return res.status(404).send(err1);
      } else {
        const sql2 = 'SELECT COUNT(id) AS count FROM mails';
        const [rows2, fields2, err2] = await db.query(sql2);
        if (err2) {
          return res.status(404).send(err2);
        } else {
          res.status(200).json({
            data: rows1,
            count: rows2[0]['count'],
          });
        }
      }

    } else if (receiverEmail && !writerEmail) {
      const sql1 =
        'SELECT id, writerEmail, receiverEmail, reserved_at, isRead, created_at FROM mails WHERE receiverEmail LIKE ? ORDER BY id LIMIT ?,10;';
      const params1 = [`%${receiverEmail}%`, (Number(page) - 1) * 10];
      const [rows1, fields1, err1] = await db.query(sql1, params1);
      if (err1) {
        return res.status(404).send(err1);
      } else {
        const sql2 = 'SELECT COUNT(id) AS count FROM mails WHERE receiverEmail LIKE ?;';
        const params2 = [`%${receiverEmail}%`]
        const [rows2, fields2, err2] = await db.query(sql2, params2);
        if (err2) {
          return res.status(404).send(err2);
        } else {
          res.status(200).json({
            data: rows1,
            count: rows2[0]['count'],
          });
        }
      }
    } else if (!receiverEmail && writerEmail) {
      const sql1 =
        'SELECT id, writerEmail, receiverEmail, reserved_at, isRead, created_at FROM mails WHERE writerEmail LIKE ? ORDER BY id LIMIT ?,10;';
      const params1 = [`%${writerEmail}%`, (Number(page) - 1) * 10];
      const [rows1, fields1, err1] = await db.query(sql1, params1);
      if (err1) {
        return res.status(404).send(err1);
      } else {
        const sql2 = 'SELECT COUNT(id) AS count FROM mails WHERE writerEmail LIKE ?;';
        const params2 = [`%${writerEmail}%`]
        const [rows2, fields2, err2] = await db.query(sql2, params2);
        if (err2) {
          return res.status(404).send(err2);
        } else {
          res.status(200).json({
            data: rows1,
            count: rows2[0]['count'],
          });
        }
      }
    }
  } catch (err) {
    throw err;
  }
};