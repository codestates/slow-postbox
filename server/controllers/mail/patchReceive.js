// const e = require('express');
// const db = require('../../db');

// module.exports = async (req, res) => {
//   try {
//     const { id, receiverEmail } = req.body;

//     const sql1 = `update mails set receiverEmail = ? where mails.id = ?;`;

//     const params1 = [`${receiverEmail}(삭제)`, id];

//     const [rows1, fields1, err1] = await db.query(sql1, params1);
//     if (err1) {
//       return res.status(401).send();
//     } else {
//       return res.status(200).send();
//     }
//   } catch (err) {
//     throw err;
//   }
// };
