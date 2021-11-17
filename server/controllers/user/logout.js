const db = require("../../db");

module.exports = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(205).json({ message: "로그아웃되었습니다" });
};
