const db = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(400).json({
        data: null,
        path: 'admin/mail',
        message: 'no accessToken',
      });
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
      return res.status(401).json({
        data: null,
        path: '/admin/mail',
        message: 'invalid accessToken',
      });
    }

    const sql1 = 'SELECT * FROM users WHERE id=?';
    const params1 = [verified.id];

    const [rows1] = await db.query(sql1, params1);

    if (rows1[0]['admin']) {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          data: null,
          path: '/admin/mail',
          message: 'id is not defined',
        });
      }
      const sql2 = 'DELETE FROM mails WHERE id=?';
      const params2 = [id];
      db.query(sql2, params2, (err, result) => {
        if (err) throw err;
        else {
          return res.status(204).end();
        }
      });
    } else {
      return res.status(403).json({
        data: null,
        path: '/admin/mail',
        message: 'forbidden access',
      });
    }
  } catch (err) {
    throw err;
  }
};
