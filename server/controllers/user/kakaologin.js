const db = require("../../db");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {

  try {
    const sql = "SELECT * FROM users WHERE email=?";
    const params = [req.body.email];
    const [result, fields, err] = await db.query(sql, params)
    if (err) throw err;
    //db에 일치하는 로그인 정보가 없을때
    else if (result.length === 0) {
      return res.json({
        data: null,
        message: "일치하는 로그인 정보가 없습니다?",
      });
    }
    //db에 일치하는 로그인 정보가 있을때
    else {
      //accessToken
      const { id, name, email, password, oauth, admin, created_at, updated_at } =
        result[0];
      const payload = {
        id,
        name,
        email,
        password,
        oauth,
        admin,
        created_at,
        updated_at
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

  } catch (err) {
    throw err;
  }
};