const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { name, email, oauth, admin, password } = req.body;
    // let { password } = req.body
    // password = password
    const salt = crypto.randomBytes(128).toString('base64');
    const hashPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex');
    const sql =
      'INSERT INTO users (name, email, salt, password, oauth, admin) VALUES(?,?,?,?,?,?)';
    const params = [name, email, salt, hashPassword, oauth, admin];
    const [result] = await db.query(sql, params);
    console.log(result);
    return res.status(201).end();

  } catch (err) {
    throw err;
  }
};
