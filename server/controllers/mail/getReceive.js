const db = require("../../db");

module.exports = async (req, res) => {
  try {
    //받은편지함
    const { email, page } = req.query

    const sql1 = `select A.id, A.writerEmail, A.receiverEmail, A.reserved_at, A.title, A.isChecked, A.isRead, A.created_at, A.updated_at, users.name 
    from mails AS A
    inner join users 
    ON A.writerEmail = users.email 
    Where receiverEmail = "${email}" and date(reserved_at) <= date_format(now(), '%Y%m%d')  
    GROUP BY A.id, users.name
    ORDER BY A.reserved_at DESC
    LIMIT ?,5;`

    const params = [(Number(page) - 1) * 5];


    const [rows1, fields1, err1] = await db.query(sql1, params);
    if (err1) {
      return res.status(401).send();
    } else {
      const sql2 = `select COUNT(id) AS count from mails where receiverEmail = "${email}" and date(reserved_at) <= date_format(now(), '%Y%m%d')`
      const [rows2, fields2, err2] = await db.query(sql2);
      if (err2) {
        return res.status(404).send(err2);
      } else
        res.status(200).json({
          data: rows1,
          count: rows2[0]['count'],
        });
    }

  }
  catch (err) {
    throw err
  }
};