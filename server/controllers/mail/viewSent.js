const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const id = req.params.mailsid;
    const sql1 = `select mails.id, mails.writerEmail, mails.receiverEmail, mails.title, mails.content, mails.reserved_at, mails.created_at, users.name, users.email from mails left join users ON mails.receiverEmail = users.email where mails.id = ?`

    const params1 = [id];
    const [rows1] = await db.query(sql1, params1);

    return res.status(200).json({ data: rows1[0] })

  }
  catch (err) {
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