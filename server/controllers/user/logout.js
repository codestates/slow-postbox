const db = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(400).json({
      data: null,
      path: '/users/login',
      message: 'no accessToken',
    });
  }
  const verified = jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET,
    (err, decoded) => {
      if (err) return null;
      return decoded;
    }
  );
  if (verified) {
    if (verified.isGuest) {
      await db.query('DELETE FROM users WHERE id=?', [verified.id]);
    }
    res.clearCookie('accessToken', { path: '/' });
    return res.status(204).end();
  }
  return res.status(403).json({
    data: null,
    path: '/users/login',
    message: 'forbidden access',
  });
};
