const db = require('../../db');
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    let duplication = true;
    let randomSet = '';
    while(duplication) {
        randomSet = Math.random().toString(36).slice(2,7);
        const check = await db.query('SELECT id FROM users WHERE email=?', [`게스트${randomSet}`]);
        duplication = check[0].length
        console.log(duplication)
    }
    const sql =
      'INSERT INTO users (name, email, oauth, admin, isGuest) VALUES(?,?,?,?,?)';
    const params = ['게스트', `게스트${randomSet}`, 0, 0, 1];
    const guestData = await db.query(sql, params);
    const [result, fields, err] = await db.query('SELECT * FROM users WHERE email=?', [`게스트${randomSet}`]);
    if (err) throw err;
    else {
        console.log(result)
        const { id, name, email, oauth, admin, isGuest } =
          result[0];
        const payload = {
          id,
          name,
          email,
          oauth,
          admin,
          isGuest
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "1d",
          });
          res
            .cookie("accessToken", accessToken, {
              maxAge: 24 * 6 * 60 * 10000
            })
            .status(200)
            .json({
              data: { accessToken: accessToken, payload },
              message: "로그인되었습니다",
            });
    }
  } catch (err) {
    return res.status(404).json({ data: null, message: '서버 에러' });
  }
};
