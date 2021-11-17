const db = require("../../db");

module.exports = async (req, res) => {
    try {
        const sql = "SELECT salt FROM users WHERE email=?"
        const params = [
            req.body.email
        ];
        const [result, fields, err] = await db.query(sql, params)
        if (err) throw err;
        else {
            return res
                .status(200)
                .json({ data: result, message: "send salt" });
        }

    } catch (err) {
        return res.status(404).json({ data: null, message: "서버 에러" });
    }
};
