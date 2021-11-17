const db = require("../../db");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')
module.exports = async (req, res) => {
  try {
    //salt select sql
    const saltSql = "SELECT salt FROM users WHERE email=?"
    const saltparams = [req.body.email];
    const [saltresult, slatfields, salterr] = await db.query(saltSql, saltparams)

    if (salterr) {
      return res.status(404).send(salterr);
    } else if (saltresult.length === 0) {
      return res.json({
        data: null,
        message: '회원정보를 확인해주세요'
      })
    }
    else {

      //가저온 salt로 비밀번호 해쉬 후 db의 값과 비교하기
      const salt = saltresult[0].salt
      const email = [req.body.email]
      const password = [req.body.password]
      const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex')
      const sql = "SELECT * FROM users WHERE email=? AND password=?";
      const params = [email, hashPassword];
      const [result, fields, err] = await db.query(sql, params)

      if (err) {
        return res.status(404).send(err)
      }

      else if (result.length === 0) {
        //결과가 없을경우
        return res.json({
          data: null,
          message: '일치하는 로그인 정보가 없습니다'
        })
      }
      else {
        //결과가 있는경우 
        //accessToken
        const { id, name, email, oauth, admin, } =
          result[0];
        const payload = {
          id,
          name,
          email,
          oauth,
          admin
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
          expiresIn: "1d",
        });
        res
          .cookie("accessToken", accessToken, {
            maxAge: 24 * 6 * 60 * 10000,
          })
          .status(200)
          .json({
            data: { accessToken: accessToken, payload },
            message: "로그인되었습니다",
          });

      }
    }
  } catch (err) {
    throw err;
  }
};
