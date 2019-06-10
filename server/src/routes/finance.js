const express = require(`express`)
const router = express.Router()

const financeController = require(`../controllers/finance`)

router.get(`/:code`, async (req, res, next) => {
  try {
    const data = await financeController.list({ startDate: req.query.startDate, code: req.params.code })
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
