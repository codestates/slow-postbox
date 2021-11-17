const db = require("../../db");

module.exports = async (req, res) => {
  try {

    const { email, page } = req.query


    const sql2 = `select A.id, A.writerEmail, A.receiverEmail, A.reserved_at, A.title, A.content, A.isChecked, A.isRead, A.created_at, A.updated_at, users.name 
    from mails AS A
    left join users 
    ON A.receiverEmail = users.email 
    Where writerEmail = "${email}" and date(reserved_at) <= date_format(now(), '%Y%m%d')  
    GROUP BY A.id, users.name    
    ORDER BY A.id 
    LIMIT ?,5;`
    const params = [(Number(page) - 1) * 5];

    const [rows1, fields1, err1] = await db.query(sql2, params);
    if (err1) {
      return res.status(401).send();
    }
    console.log("1", rows1)

    if (rows1) {
      rows1.map((el) => {
        const removeEmail = el.receiverEmail
        const patchEmail = removeEmail.slice(removeEmail.length - 2)
        if (patchEmail === "삭제") {
          el.receiverEmail = rows1[0].receiverEmail.slice(0, -2)
          return el
        }
      })
      console.log("2", rows1)

      return res.status(200).json({
        data: rows1
      })

    }

  }
  catch (err) {
    throw err
  }
};



// const sql4 = `select users.name from users where email = ${el.receiverEmail};`
// const [rows2, fields2, err2] = db.query(sql4);
// if (err2) {
//   return res.status(401).send();
// }
// console.log(rows2)
// if (rows2) {
//   const removeMailUser = rows2[0]
// }