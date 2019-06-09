module.exports = ({ pool }) => {
  return {
    insert({ code, high, low, bid, ask, date }) {
      console.log({ code, high, low, bid, ask, date })
      pool.query(`INSERT INTO finance(code, high, low, bid, ask, date) values($1, $2, $3, $4, $5, $6)`, [
        code,
        high,
        low,
        bid,
        ask,
        date,
      ])
    },
  }
}
