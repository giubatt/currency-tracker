const axios = require(`axios`).default
const schedule = require(`node-schedule`)
const financeController = require(`../controllers/finance`)

const url = `https://economia.awesomeapi.com.br/all/USD-BRL,BTC-BRL,EUR-BRL`

const rule = `2 * * * *`

const job = async () => {
  const res = await axios.get(url)

  Object.values(res.data).forEach(({ code, high, low, bid, ask, create_date }) => {
    function parseNumberString(number) {
      return parseFloat(number.replace(`.`, ``).replace(`,`, `.`))
    }

    financeController.insert({
      code,
      high: parseNumberString(high),
      low: parseNumberString(low),
      bid: parseNumberString(bid),
      ask: parseNumberString(ask),
      date: new Date(create_date),
    })
  })
}

schedule.scheduleJob({ rule }, job)

module.exports = job
