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
    const [row, field, err] = await db.query(sql, params);
    if (err) {
      console.log(err);
      return res.status(404).json({ message: 'fail' });
    } else {
      console.log('변경됨');
      return res.status(200).json({ message: 'success' });
    }
  } catch (err) {
    throw err;
  }
};
