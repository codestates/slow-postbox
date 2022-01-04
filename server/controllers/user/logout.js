const db = require("../../db");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const verified = jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET,
    (err, decoded) => {
      if (err) return null;
      return decoded;
    }
  );

  if (verified.isGuest) {
    await db.query('DELETE FROM users WHERE id=?', [verified.id]);
  }
  res.clearCookie("accessToken", { path: "/" });
  res.status(205).json({ message: "로그아웃되었습니다" });
};
