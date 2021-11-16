const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { name, email, page } = req.query;
    if (!name && !email) {
      const sql1 =
        'SELECT users.id, users.name, users.email, users.created_at, IFNULL(A.receiveNum,0) AS receiveNum, IFNULL(B.writeNum,0) AS writeNum from users LEFT JOIN (SELECT mails.receiverEmail, COUNT(mails.id) AS receiveNum FROM mails GROUP BY mails.receiverEmail) AS A ON A.receiverEmail=users.email LEFT JOIN (SELECT mails.writerEmail, COUNT(mails.id) AS writeNum FROM mails GROUP BY mails.writerEmail) AS B ON users.email=B.writerEmail ORDER BY users.id LIMIT ?,10;';
      const params = [(Number(page)-1)*10];
      const [rows1, fields1, err1] = await db.query(sql1, params);
      if (err1) {
        return res.status(404).send(err1);
      } else {
        const sql2 = 'SELECT COUNT(id) AS count FROM users';
        const [rows2, fields2, err2] = await db.query(sql2);
        if (err2) {
          return res.status(404).send(err2);
        } else {
          res.status(200).json({
            data: rows1,
            count: rows2[0]['count'],
          });
        }
      }
    } else if(name && !email) {
      const sql1 =
        'SELECT users.id, users.name, users.email, users.created_at, IFNULL(A.receiveNum,0) AS receiveNum, IFNULL(B.writeNum,0) AS writeNum from users LEFT JOIN (SELECT mails.receiverEmail, COUNT(mails.id) AS receiveNum FROM mails GROUP BY mails.receiverEmail) AS A ON A.receiverEmail=users.email LEFT JOIN (SELECT mails.writerEmail, COUNT(mails.id) AS writeNum FROM mails GROUP BY mails.writerEmail) AS B ON users.email=B.writerEmail WHERE users.name LIKE ? ORDER BY users.id LIMIT ?,10;';
      const params1 = [`%${name}%`,(Number(page)-1)*10];
      const [rows1, fields1, err1] = await db.query(sql1, params1);
      if (err1) {
        return res.status(404).send(err1);
      } else {
        const sql2 = 'SELECT COUNT(id) AS count FROM users WHERE name LIKE ?;';
        const params2 = [`%${name}%`]
        const [rows2, fields2, err2] = await db.query(sql2, params2);
        if (err2) {
          return res.status(404).send(err2);
        } else {
          res.status(200).json({
            data: rows1,
            count: rows2[0]['count'],
          });
        }
      }
    } else if(!name && email){
      const sql1 =
      'SELECT users.id, users.name, users.email, users.created_at, IFNULL(A.receiveNum,0) AS receiveNum, IFNULL(B.writeNum,0) AS writeNum from users LEFT JOIN (SELECT mails.receiverEmail, COUNT(mails.id) AS receiveNum FROM mails GROUP BY mails.receiverEmail) AS A ON A.receiverEmail=users.email LEFT JOIN (SELECT mails.writerEmail, COUNT(mails.id) AS writeNum FROM mails GROUP BY mails.writerEmail) AS B ON users.email=B.writerEmail WHERE users.email LIKE ? ORDER BY users.id LIMIT ?,10;';
    const params1 = [`%${email}%`,(Number(page)-1)*10];
    const [rows1, fields1, err1] = await db.query(sql1, params1);
    if (err1) {
      return res.status(404).send(err1);
    } else {
      const sql2 = 'SELECT COUNT(id) AS count FROM users WHERE email LIKE ?;';
      const params2 = [`%${email}%`]
      const [rows2, fields2, err2] = await db.query(sql2, params2);
      if (err2) {
        return res.status(404).send(err2);
      } else {
        res.status(200).json({
          data: rows1,
          count: rows2[0]['count'],
        });
      }
    }
    }
  } catch (err) {
    throw err;
  }
};
