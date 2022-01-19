const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { name, email, oauth, admin } = req.body;
    let { password } = req.body
    password = password || 'asdf'
    const salt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
      .createHash('sha512')
      .update(password + salt)
      .digest('hex');
    const sql =
      'INSERT INTO users (name, email, salt, password, oauth, admin) VALUES(?,?,?,?,?,?)';
    const params = [name, email, salt, hashPassword, oauth, admin];
    const [result, fields, err] = await db.query(sql, params);
    if (err) throw err;
    else {
      console.log(result);
      return res.status(201).end();
    }
  } catch (err) {
    throw err;
  }
};
