const db = require("../../db");

module.exports = async (req, res) => {
  try {
    const email = req.body.email

    const sql1 = `update mails set isChecked = 1 
                  where receiverEmail = "${email}" and date(reserved_at) > date_format(now(), '%Y%m%d');`

    const [rows1, fields1, err1] = await db.query(sql1);

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