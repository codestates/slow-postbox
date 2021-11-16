const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;
    const sql =
      "INSERT INTO users (name, email, password) VALUES(?,?,?)";
    const params = [
      name,
      email,
      password,
    ];
    db.query(sql, params, (err, result) => {
      if (err) throw err;
      else {
        return res
          .status(200)
          .json({ data: result, message: "회원가입이 완료되었습니다" });
      }
    });
  } catch (err) {
    return res.status(404).json({ data: null, message: "서버 에러" });
  }
};
