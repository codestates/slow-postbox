const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newSalt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
      .createHash('sha512')
      .update(password + newSalt)
      .digest('hex');

    const sql = 'UPDATE users SET salt=?, password=? WHERE email=?';
    const params = [newSalt, hashPassword, email];
    await db.query(sql, params);

    return res.status(204).end();
  } catch (err) {
    throw err;
  }
};
