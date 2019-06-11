const db = require(`../models`)

exports.list = async ({ startDate, code }) => {
  const { rows } = await db.finance.select({ startDate, code: code.toUpperCase() })
  return rows
}

exports.insert = async ({ code, high, low, bid, ask, date }) => {
  db.finance.insert({
    code,
    high: parseFloat(high),
    low: parseFloat(low),
    bid: parseFloat(bid),
    ask: parseFloat(ask),
    date,
  })
}
