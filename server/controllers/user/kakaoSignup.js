const db = require('../../db');
// const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const { name, email, oauth, admin, } = req.body;
        // let { password } = req.body
        // password = password
        // const salt = crypto.randomBytes(128).toString('base64');
        // const hashPassword = crypto
        //   .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
        //   .toString('hex');
        const sql =
            'INSERT INTO users (name, email, oauth, admin) VALUES(?,?,?,?)';
        const params = [name, email, oauth, admin];
        const [result, fields, err] = await db.query(sql, params);
        if (err) throw err;
        else {
            console.log(result);
            return res.status(201).end();
        }
    } catch (err) {
        throw err;
    }
};
