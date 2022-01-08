const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email } = req.body
    const sql1 = `update mails set isChecked = 1 
                  where receiverEmail = "${email}" and date(reserved_at) > date_format(now(), '%Y%m%d');`;

    await db.query(sql1);
    return res.status(204).end();

  }
  catch (err) {
    throw err
  }
};
