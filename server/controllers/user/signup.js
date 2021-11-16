const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { name, email, salt, hashPassword } = req.body;
    const sql =
      'INSERT INTO users (name, email, salt, password) VALUES(?,?,?,?)';
    const params = [name, email, salt, hashPassword];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      else {
        return res
          .status(200)
          .json({ data: result, message: '회원가입이 완료되었습니다' });
      }
    });
  } catch (err) {
    return res.status(404).json({ data: null, message: '서버 에러' });
  }
};
