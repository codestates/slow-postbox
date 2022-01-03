const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password) {
      return res.status(400).json({
        data: null,
        error: {
          path: '/users/info',
          message: 'insufficient body data',
        },
      });
    }
    const newSalt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
      .createHash('sha512')
      .update(password + newSalt)
      .digest('hex');

    const sql = 'UPDATE users SET salt=?, password=? WHERE email=?';
    const params = [newSalt, hashPassword, email];
    await db.query(sql, params);

    return res.status(204);
  } catch (err) {
    throw err;
  }
};
