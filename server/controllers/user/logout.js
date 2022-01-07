const db = require('../../db');
const jwt = require('jsonwebtoken');
const { getAccessToken } = require('../../funcs/index');
module.exports = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const verified = await getAccessToken(req, res);
  if (verified) {
    if (verified.isGuest) {
      await db.query('DELETE FROM users WHERE id=?', [verified.id]);
    }
    res.clearCookie('accessToken', { path: '/' });
    return res.status(204).end();
  }
  return res.status(403).json({
    data: null,
    path: '/users/logout',
    message: 'forbidden access',
  });
};
