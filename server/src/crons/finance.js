const axios = require(`axios`).default
const schedule = require(`node-schedule`)
const db = require(`../models`)

const url = `https://economia.awesomeapi.com.br/all/USD-BRL,BTC-BRL,EUR-BRL`

const rule = `* * * * *`

schedule.scheduleJob({ rule }, async () => {
  const res = await axios.get(url)

  Object.values(res.data).forEach(data => {
    const { code, high, low, bid, ask, create_date } = data

    function parseNumberString(number) {
      return parseFloat(number.replace(`.`, ``).replace(`,`, `.`))
    }

    db.finance.insert({
      code,
      high: parseNumberString(high),
      low: parseNumberString(low),
      bid: parseNumberString(bid),
      ask: parseNumberString(ask),
      date: new Date(create_date),
    })
  })
})
