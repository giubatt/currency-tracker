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

exports.getFirstAndLastEntry = async ({ code, startDate, endDate }) => {
  const {
    rows: [first],
  } = await db.finance.selectOne({ code, startDate, endDate, orderAsc: true })
  const {
    rows: [last],
  } = await db.finance.selectOne({ code, startDate, endDate, orderAsc: false })
  return {
    first,
    last,
  }
}

exports.getVariation = async ({ code, startDate, endDate = new Date() }) => {
  const { first, last } = await exports.getFirstAndLastEntry({ code: code.toUpperCase(), startDate, endDate })

  if (!first || !first.bid || !last || !last.bid) return 0
  return Math.fround((last.bid / first.bid - 1) * 100)
}
