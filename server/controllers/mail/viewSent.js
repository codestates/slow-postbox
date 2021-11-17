const db = require("../../db");

module.exports = async (req, res) => {
  try {

    console.log(req.params.mailsid)
    const id = req.params.mailsid;
    const sql1 = `select * from mails inner join users ON mails.writerEmail = users.email where mails.id = ?`

    const params1 = [id];


    const [rows1, fields1, err1] = await db.query(sql1, params1);

    if (err1) {
      return res.status(401).send();
    }

    if (rows1) {
      const removeEmail = rows1[0].receiverEmail
      const patchEmail = removeEmail.slice(removeEmail.length - 2)
      if (patchEmail === "삭제") {
        rows1[0].receiverEmail = rows1[0].receiverEmail.slice(0, -2)
        return res.status(200).json({
          data: rows1[0]
        })
      } else {
        return res.status(200).json({
          data: rows1[0]
        })
      }
    }



  }
  catch (err) {
    throw err
  }
};