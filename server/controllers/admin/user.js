const db = require('../../db');
const { getAccessToken } = require('../../funcs/index');

module.exports = async (req, res) => {
  try {
    const verified = await getAccessToken(req, res);

    const sql1 = 'SELECT * FROM users WHERE id=?';
    const params1 = [verified.id];

    const [rows1] = await db.query(sql1, params1);

    if (rows1[0]['admin']) {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({
          data: null,
          path: '/admin/user',
          message: 'id is not defined',
        });
      }
      const sql2 = 'DELETE FROM users WHERE id=?';
      const params2 = [id];
      db.query(sql2, params2, (err, result) => {
        if (err) throw err;
        else {
          return res.status(204).end();
        }
      });
    } else {
      return res.status(403).json({
        data: null,
        path: '/admin/user',
        message: 'forbidden access',
      });
    }
  } catch (err) {
    if (err instanceof ReferenceError) {
      return res.status(400).json({
        err: err.name,
        message: err.message,
      });
    } else {
      throw err;
    }
  }
};
