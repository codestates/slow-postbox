const db = require('../../db');
// const crypto = require('crypto');

module.exports = async (req, res) => {
    try {
        const { name, email, oauth, admin, } = req.body;
        const sql =
            'INSERT INTO users (name, email, oauth, admin) VALUES(?,?,?,?)';
        const params = [name, email, oauth, admin];
        const [result, err] = await db.query(sql, params);
        console.log(result);
        return res.status(201).end();

    } catch (err) {
        throw err;
    }
};
