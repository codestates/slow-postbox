const db = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(403).send();
    }

    const verified = jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET,
      (err, decoded) => {
        if (err) return null;
        return decoded;
      }
    );

    if (!verified) {
      return res.status(401).send();
    }

    const sql1 = 'SELECT * FROM users WHERE id=?';
    const params1 = [verified.id];

    const [rows1, fields1, err1] = await db.query(sql1, params1);
    if (err1) {
      return res.status(401).send();
    }
    if (rows1[0]['admin']) {
      const { id } = req.body;
      if (!id) {
        return res.status(404).send();
      }
      const sql2 = 'DELETE FROM mails WHERE id=?';
      const params2 = [id];
      db.query(sql2, params2, (err, result) => {
        if (err) throw err;
        else {
          return res.status(200).json();
        }
      });
    } else {
      return res.status(403).send();
    }
  } catch (err) {
    throw err;
  }
};
