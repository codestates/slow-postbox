const db = require('../../db');

module.exports = async (req, res) => {
  try {
    //도착예정함

    const { email, page } = req.query

    const sql1 = `select A.id, A.writerEmail, A.receiverEmail, A.reserved_at, A.isChecked, A.isRead, A.created_at, A.updated_at, users.name 
    from mails AS A
    left join users 
    ON A.writerEmail = users.email 
    Where A.receiverEmail = ? and date(reserved_at) > date_format(now(), '%Y%m%d')  
    GROUP BY A.id, users.name
    ORDER BY A.reserved_at
    LIMIT ?,5;`
    const params = [email, (Number(page) - 1) * 5];

    const [rows1] = await db.query(sql1, params);
    const sql2 = `select COUNT(id) AS count from mails where receiverEmail = "${email}" and date(reserved_at) > date_format(now(), '%Y%m%d')`
    const [rows2] = await db.query(sql2);

    return res.status(200).json({ data: rows1, count: rows2[0]['count'] });

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
