const db = require('../../db');
const { createAccessToken } = require('../../funcs/index');
module.exports = async (req, res) => {
  try {
    let duplication = true;
    let randomSet = '';
    while (duplication) {
      randomSet = Math.random().toString(36).slice(2, 7);
      const check = await db.query('SELECT id FROM users WHERE email=?', [
        `게스트${randomSet}`,
      ]);
      duplication = check[0].length;
      console.log(duplication);
    }
    const sql =
      'INSERT INTO users (name, email, oauth, admin, isGuest) VALUES(?,?,?,?,?)';
    const params = ['게스트', `게스트${randomSet}`, 0, 0, 1];
    await db.query(sql, params);
    const [result] = await db.query(
      'SELECT * FROM users WHERE email=?',
      [`게스트${randomSet}`]
    );
    const { id, name, email, oauth, admin, isGuest } = result[0];
    const payload = {
      id,
      name,
      email,
      oauth,
      admin,
      isGuest,
    };
    await createAccessToken(req, res, payload);

  } catch (err) {
    throw err;
  }
};
