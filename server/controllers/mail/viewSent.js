const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const id = req.params.mailsid;
    const sql3 = `update mails set isRead = 1 where mails.id =?`
    const sql1 = `select mails.id, mails.writerEmail, mails.receiverEmail, mails.title, mails.content, mails.reserved_at, mails.created_at, users.name, users.email from mails left join users ON mails.receiverEmail = users.email where mails.id = ?`

    const params1 = [id];


    const [rows2, fields2, err2] = await db.query(sql3, params1);
    const [rows1, fields1, err1] = await db.query(sql1, params1);

    if (err1) {
      return res.status(401).send();
    }

    if (rows1) {
      return res.status(200).json({
        data: rows1[0]
      })
    }




  }
  catch (err) {
    throw err
  }
};