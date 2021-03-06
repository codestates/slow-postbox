const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    // const sql1 = 'SELECT * from users WHERE email=?';
    // const params1 = [email];
    // const [row1] = await db.query(sql1, params1);
    // if (row1.length === 0) {
    //   return res.json({ message: 'not authorized' });
    // } else {
    const sql = 'DELETE FROM users WHERE email = ?';
    const params = [email];
    await db.query(sql, params);

    res.status(204).end();
    //}
  } catch (err) {
    throw err;
  }
};
