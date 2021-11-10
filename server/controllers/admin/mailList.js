const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const sql = 'SELECT id, writerEmail, receiverEmail, isRead, reserved_at, created_at FROM mails'
    const [rows, fields, err] = await db.query(sql)
    if(err) {
        console.log(err)
    }
    else {
        res.status(200).json({
            data: rows,
        })
    }
}
  catch (err) {
    throw err
  }
};