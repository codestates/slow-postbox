module.exports = {
  received: require('./received'),
  receivedReservation: require('./receivedReservation'),
  sent: require('./sent'),
  getReservedSent: require('./getReservedSent'),
  reservedCheck: require('./reservedCheck'),
  viewReceived: require('./viewReceived'),
  viewSent: require('./viewSent'),
  receivedlogs: require('./receivedlogs'),
  sentlogs: require('./sentlogs'),
  getPaginatedMails: require('./getPaginatedMails'),
  notiCount: require('./notiCount'),
  checkedReceived: require('./checkedReceived'),
  email: require('./email'),
  create: async (req, res) => {
    try {
      const { writerEmail, receiverEmail, content, reserved_at } = req.body;
      let { title } = req.body;
      if (
        writerEmail &&
        receiverEmail &&
        content &&
        reserved_at &&
        title.length >= 0
      ) {
        if (title.length === 0) {
          title = '(제목없음)';
        }

        const sql =
          'INSERT INTO mails (writerEmail, receiverEmail, title, content, reserved_at) VALUES (?,?,?,?,?)';
        const params = [
          writerEmail,
          receiverEmail,
          title,
          content,
          reserved_at,
        ];
        await db.query(sql, params);

        return res.status(201).end();
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        return res.status(400).json({
          err: err.name,
          message: err.message,
        });
      } else {
        throw err;
      }
    }
  },
};
