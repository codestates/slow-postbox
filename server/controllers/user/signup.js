const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { name, email, oauth, password, admin } = req.body;
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
      return res
        .status(200)
        .json({ data: result, message: '회원가입이 완료되었습니다' });
    }
  } catch (err) {
    return res.status(404).json({ data: null, message: '서버 에러' });
  }
};
