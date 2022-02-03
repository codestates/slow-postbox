const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql1 = 'SELECT salt,password as decoded FROM users WHERE email=?';
    const params1 = [email];
    const [row1] = await db.query(sql1, params1);
    const hashPassword = crypto
      .createHash('sha512')
      .update(password + row1[0]['salt'])
      .digest('hex');

    if (row1[0]['decoded'] === hashPassword) {
      const sql2 = 'DELETE FROM users WHERE password=?';
      const params2 = [hashPassword];
      const [row2, field2] = await db.query(sql2, params2);

      return res.status(204);
    } else {
      return res.status(400).json({
        data: null,
        error: {
          path: '/users/withdrawal',
          message: 'not authorized',
        },
      });
    }
  } catch (err) {
    throw err;
  }
};
