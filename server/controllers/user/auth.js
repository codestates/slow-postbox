const db = require("../../db");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      return res.status(403).send({ data: { isLogin: false, id: null }, message: "refresh token not provided" })
    }

    const verified = jwt.verify(accessToken, process.env.ACCESS_SECRET, (err, decoded) => {
      if (err) return null
      return decoded
    })

    if (!verified) {
      return res.status(401).send({ data: { isLogin: false, id: null }, message: "invalid refresh token, please log in again" })
    }
    const sql = "SELECT * FROM users WHERE id=?";
    const params = [verified.id];
    const [result, fields, err] = await db.query(sql, params)
    if (err) throw err;
    //db에 일치하는 로그인 정보가 없을때
    else if (result.length === 0) {
      return res.json({ data: { isLogin: false, id: null }, message: "This user information does not exist" });
    }
    //db에 일치하는 로그인 정보가 있을때
    else {
      const { admin, id, name, email, oauth } = result[0];

      res.status(200)
        .json({
          data: { isLogin: true, admin, id, name, email, oauth },
          message: "로그인되었습니다",
        });
    }

  }
  catch (err) {
    throw err
  }
};
