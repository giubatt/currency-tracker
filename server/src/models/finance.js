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
    select({ startDate, code }) {
      return pool.query(`SELECT * FROM "finance" WHERE date > $1 AND code = $2 ORDER BY date ASC;`, [startDate, code])
    },
  }
}
