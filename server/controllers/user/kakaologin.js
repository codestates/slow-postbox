const db = require("../../db");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {

  try {
    const sql = "SELECT * FROM users WHERE email=?";
    const params = [req.body.email];
    const [result] = await db.query(sql, params)

    //db에 일치하는 로그인 정보가 없을때
    if (result.length === 0) {
      return res.status(404).json({
        data: null,
        path: "/users/kakaoLogin",
        message: "user data not found",
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
        .status(204).end()
    }
  } catch (err) {
    throw err;
  }
};