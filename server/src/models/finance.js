module.exports = ({ pool }) => {
  return {
    insert({ code, high, low, bid, ask, date }) {
      return pool.query(`INSERT INTO finance(code, high, low, bid, ask, date) values($1, $2, $3, $4, $5, $6);`, [
        code,
        high,
        low,
        bid,
        ask,
        date,
      ])
    },
    select({ startDate, endDate = new Date(), code }) {
      return pool.query(`SELECT * FROM "finance" WHERE date > $1 AND date < $2 AND code = $3 ORDER BY date ASC;`, [
        startDate,
        endDate,
        code,
      ])
    },
    selectOne({ startDate, endDate = new Date(), code, orderAsc = true }) {
      return pool.query(
        `SELECT * FROM "finance" WHERE date > $1 AND date < $2 AND code = $3 ORDER BY date ${
          orderAsc ? `ASC` : `DESC`
        } LIMIT 1;`,
        [startDate, endDate, code],
      )
    },
  }
}
