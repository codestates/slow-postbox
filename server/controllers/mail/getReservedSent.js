const db = require("../../db");

module.exports = async (req, res) => {
  try {

    const { testemail } = req.query

    const sql2 = `select A.id, A.writerEmail, A.receiverEmail, A.reserved_at, A.title, A.content, A.isChecked, A.isRead, A.created_at, A.updated_at, users.name 
    from mails AS A
    left join users 
    ON A.receiverEmail = users.email 
    Where writerEmail = "${testemail}" and date(reserved_at) >= date_format(now(), '%Y%m%d')  
    GROUP BY A.id, users.name;`

    const [rows1, fields1, err1] = await db.query(sql2);
    if (err1) {
      return res.status(401).send();
    }

    if (rows1) {
      return res.status(200).json({
        data: rows1
      })
    }
    console.log(rows1)
  }
  catch (err) {
    throw err
  }
};
