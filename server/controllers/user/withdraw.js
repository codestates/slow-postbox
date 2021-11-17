const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);
    const sql1 = 'SELECT salt,password as decoded FROM users WHERE email=?';
    const params1 = [email];
    const [row1, field1, err1] = await db.query(sql1, params1);
    if (err1) {
      console.log(err1);
      return res.status(404).json({ message: 'error' });
    }
    //console.log(row); [{salt:'111', decoded:'helloworld'}]
    const hashPassword = crypto
      .createHash('sha512')
      .update(password + row1[0]['salt'])
      .digest('hex');

    if (row1[0]['decoded'] === hashPassword) {
      const sql2 = 'DELETE FROM users WHERE password=?';
      const params2 = [hashPassword];
      const [row2, field2, err2] = await db.query(sql2, params2);
      if (err2) {
        console.log(err2);
        return res.status(404).json({ message: 'error' });
      } else {
        console.log('탈퇴됨');
        return res.status(200).json({ message: 'success' });
      }
    } else {
      console.log('비밀번호 틀림');
      return res.json({ message: 'not authorized' });
    }
  } catch (err) {
    throw err;
  }
};
