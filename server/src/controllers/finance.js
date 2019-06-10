const { finance } = require(`../models`)

exports.list = async ({ startDate, code }) => {
  const { rows } = await finance.select({ startDate, code: code.toUpperCase() })
  return rows
}
