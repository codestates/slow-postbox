const db = require('../../db');
const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body.data;
        const newSalt = crypto.randomBytes(128).toString('base64');
        const hashPassword = crypto
            .createHash('sha512')
            .update(password + newSalt)
            .digest('hex');

        const sql = 'UPDATE users SET salt=?, password=? WHERE email=?';
        const params = [newSalt, hashPassword, email];
        const [result, field, err] = await db.query(sql, params);
        if (err) {
            console.log(err);
            c
            return res.status.send('실패');
        } else {
            console.log('변경됨');
            return res
                .status(200)
                .json({ data: result, message: "회원가입이 완료되었습니다" })

        }
    } catch (err) {
        throw err;
    }
};