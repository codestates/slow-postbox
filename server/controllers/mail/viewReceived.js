const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const id = req.params.mailsid;
    const sql2 = `update mails set isRead = 1 where mails.id =?`
    const sql1 = `select mails.id, mails.writerEmail, mails.receiverEmail, mails.title, mails.content, mails.reserved_at, mails.created_at, users.name, users.email from mails left join users ON mails.writerEmail = users.email where mails.id = ?`

    const params1 = [id];
    await db.query(sql2, params1);

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
