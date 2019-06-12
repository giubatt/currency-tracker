const financeJob = require(`./finance`)

jest.mock(`axios`)
jest.mock(`../controllers/finance`)
const financeController = require(`../controllers/finance`)
const axios = require(`axios`).default

describe(`job`, () => {
  test(`calls financeController.insert with correct parameters`, async () => {
    // Arrange
    axios.get.mockResolvedValue({
      data: {
        USD: {
          code: `USD`,
          codein: `BRL`,
          name: `Dólar Comercial`,
          high: `3,8569`,
          low: `3,8564`,
          varBid: `-0,0005`,
          pctChange: `-0,01`,
          bid: `3,8563`,
          ask: `3,8565`,
          timestamp: `1560292202`,
          create_date: `2019-06-11 21:00:05`,
        },
        BTC: {
          code: `BTC`,
          codein: `BRL`,
          name: `Bitcoin`,
          high: `31.495,0`,
          low: `30.300,0`,
          varBid: `-512,1`,
          pctChange: `-1,63`,
          bid: `30.761,0`,
          ask: `30.997,8`,
          timestamp: `1560307558`,
          create_date: `2019-06-11 23:45:59`,
        },
        EUR: {
          code: `EUR`,
          codein: `BRL`,
          name: `Euro`,
          high: `4,3719`,
          low: `4,3677`,
          varBid: `-0,0008`,
          pctChange: `-0,02`,
          bid: `4,3684`,
          ask: `4,3690`,
          timestamp: `1560307546`,
          create_date: `2019-06-11 23:45:47`,
        },
      },
    })

    // Act
    await financeJob()

    // Assert
    expect(financeController.insert).toHaveBeenCalledTimes(3)
    expect(financeController.insert).toHaveBeenCalledWith({
      code: `USD`,
      high: 3.8569,
      low: 3.8564,
      bid: 3.8563,
      ask: 3.8565,
      date: new Date(`2019-06-11 21:00:05`),
    })
    expect(financeController.insert).toHaveBeenCalledWith({
      code: `BTC`,
      high: 31495.0,
      low: 30300.0,
      bid: 30761.0,
      ask: 30997.8,
      date: new Date(`2019-06-11 23:45:59`),
    })
    expect(financeController.insert).toHaveBeenCalledWith({
      code: `EUR`,
      high: 4.3719,
      low: 4.3677,
      bid: 4.3684,
      ask: 4.369,
      date: new Date(`2019-06-11 23:45:47`),
    })
  })
})
