const db = require("../../db");

module.exports = async (req, res) => {
  try {

    const { id, receiverEmail } = req.body.data
    console.log(id, receiverEmail)

    const sql1 = `update mails set receiverEmail = ? where mails.id = ?;`
    // const sql1 = `update mails set receiverEmail = sunyeong2222@gamil.com"(삭제) where mails.id =12 ;`

    const params1 = [`${receiverEmail}삭제`, id]


    const [rows1, fields1, err1] = await db.query(sql1, params1);
    console.log(rows1)



    if (err1) {
      return res.status(401).send();
    }

    if (rows1) {
      return res.status(200).send();
    }

  }
  catch (err) {
    throw err
  }
};