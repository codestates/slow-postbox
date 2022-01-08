const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id, writerEmail, receiverEmail } = req.body // 여기 3개받기

    if (writerEmail) {
      const sql1 = `update mails set writerEmail = ? where mails.id = ?;`
      const params1 = [`${writerEmail}(삭제)`, id]
      await db.query(sql1, params1);

      return res.status(204).end();
    }

    if (receiverEmail) {
      const sql2 = `update mails set receiverEmail = ? where mails.id = ?;`;
      const params2 = [`${receiverEmail}(삭제)`, id];
      await db.query(sql2, params2);

      return res.status(204).end();
    }
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
