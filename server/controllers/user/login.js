const db = require('../../db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
module.exports = async (req, res) => {
  try {
    //salt select sql
    const saltSql = 'SELECT salt FROM users WHERE email=?';
    const saltparams = [req.body.email];
    const [saltresult] = await db.query(
      saltSql,
      saltparams
    );

    if (saltresult.length === 0) {
      return res.json({
        data: null,
        message: '회원정보를 확인해주세요',
      });
    } else {
      //가저온 salt로 비밀번호 해쉬 후 db의 값과 비교하기
      const salt = saltresult[0].salt;
      const email = req.body.email;
      const password = req.body.password;
      const hashPassword = crypto
        .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        .toString('hex');
      const sql = 'SELECT * FROM users WHERE email=? AND password=?';
      const params = [email, hashPassword];
      const [result] = await db.query(sql, params);

      if (result.length === 0) {
        //결과가 없을경우
        return res.json({
          data: null,
          path: "/users/login",
          message: "wrong email or password"
        });
      } else {
        //결과가 있는경우
        //accessToken
        const { id, name, email, oauth, admin, isGuest } = result[0];
        const payload = {
          id,
          name,
          email,
          oauth,
          admin,
          isGuest,
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
          expiresIn: '1d',
        });
        res
          .cookie('accessToken', accessToken, {
            maxAge: 24 * 6 * 60 * 10000,
          })
          .status(200)
          .json({
            data: { accessToken: accessToken, payload },
          });
      }
    }
  } catch (err) {
    throw err;
  }
};
