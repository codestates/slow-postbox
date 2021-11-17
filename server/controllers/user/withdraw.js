const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);
    const sql = 'SELECT salt,password as decoded FROM users WHERE email=?';
    const params = [email];
    const [row, field, err] = await db.query(sql, params);
    if (err) {
      console.log(err);
      return res.status(404).send('실패');
    } else {
      //console.log(row); [{salt:'111', decoded:'helloworld'}]
      const hashPassword = crypto
        .createHash('sha512')
        .update(password + row[0]['salt'])
        .digest('hex');
      console.log(hashPassword);
      if (row[0]['decoded'] === hashPassword) {
        const sql = 'DELETE FROM users WHERE password=?';
        const params = [hashPassword];
        const [row, field, err] = await db.query(sql, params);
        if (err) {
          console.log(err);
          return res.status.send('실패');
        } else {
          console.log('탈퇴됨');
          return res.status(200).send('회원탈퇴');
        }
      } else {
        return res.status(401).send('권한없음');
      }
    }
  } catch (err) {
    throw err;
  }
};
