const express = require(`express`)
const router = express.Router()
const axios = require(`axios`).default

const financeController = require(`../controllers/finance`)

router.get(`/variation/:codes`, async (req, res, next) => {
  try {
    const codes = req.params.codes.split(`,`)
    const promises = codes.map(async code => {
      let dayPromise = financeController.getVariation({
        startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        code,
      })
      let weekPromise = financeController.getVariation({
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        code,
      })
      let monthPromise = financeController.getVariation({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        code,
      })
      let trimesterPromise = financeController.getVariation({
        startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        code,
      })
      const [day, week, month, trimester] = await Promise.all([dayPromise, weekPromise, monthPromise, trimesterPromise])
      return {
        [code]: {
          day,
          week,
          month,
          trimester,
        },
      }
    })

    const dataArray = await Promise.all(promises)
    const data = dataArray.reduce((result, current) => ({ ...result, ...current }), {})

    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.get(`/:codes`, async (req, res, next) => {
  try {
    const codes = req.params.codes.split(`,`)
    const promises = codes.map(async code => {
      const data = await financeController.list({ startDate: req.query.startDate, code })
      return {
        [code]: data,
      }
    })

    const dataArray = await Promise.all(promises)
    const data = dataArray.reduce((result, current) => ({ ...result, ...current }), {})

    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.post(`/fill-history`, async (req, res, next) => {
  try {
    ;[`USD`, `BTC`, `EUR`].forEach(async code => {
      const { data } = await axios.get(`https://economia.awesomeapi.com.br/list/${code}-BRL/120`)
      data.map(({ high, low, bid, ask, timestamp }) => {
        return financeController.insert({
          code,
          high,
          low,
          bid,
          ask,
          date: new Date(timestamp * 1000),
        })
      })
      await Promise.all(data)
    })
    res.json({ status: `done` })
  } catch (error) {
    next(error)
  }
})

module.exports = router
