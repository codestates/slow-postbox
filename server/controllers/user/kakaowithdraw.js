const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const sql1 = 'SELECT * from users WHERE email=?';
    const params1 = [email];
    const [row1, field1, err1] = await db.query(sql1, params1);
    if (err1) {
      return res.status(404).json({ message: 'error' });
    } else if (row1.length === 0) {
      return res.json({ message: 'not authorized' });
    } else {
      const sql2 = 'DELETE FROM users WHERE email = ?';
      const params2 = [email];
      const [row2, field2, err2] = await db.query(sql2, params2);
      if (err2) {
        console.log(err2);
        return res.json({ message: 'error' });
      }
      res.status(200).json({ message: 'success' });
    }
  } catch (err) {
    console.log(err);
  }
};
