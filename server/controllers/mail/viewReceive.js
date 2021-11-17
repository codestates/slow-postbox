const db = require("../../db");

module.exports = async (req, res) => {
  try {

    console.log(req.params.mailsid)
    const id = req.params.mailsid;
    const sql3 = `update mails set isRead = 1 where mails.id =?`
    const sql1 = `select * from mails inner join users ON mails.writerEmail = users.email where mails.id = ?`

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