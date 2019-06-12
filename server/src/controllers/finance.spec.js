const financeController = require(`./finance`)

jest.mock(`../models`)
const db = require(`../models`)

describe(`getVariation`, () => {
  describe(`calculates variation correctly`, () => {
    ;[
      [25, 20, -20],
      [100, 1, -99],
      [123, 123, 0],
      [400, 408, 2],
      [25, 30, 20],
      [10, 11, 10],
      [10, 100, 900],
      [1, 30, 2900],
    ].forEach(([from, to, variation]) => {
      test(`${from} -> ${to} = ${variation}%`, async () => {
        // Arrange
        db.finance.selectOne.mockImplementation(async ({ orderAsc }) => {
          if (orderAsc)
            return {
              rows: [{ bid: from }],
            }

          return {
            rows: [{ bid: to }],
          }
        })

        // Act
        const result = financeController.getVariation({
          code: `USD`,
          startDate: new Date(),
        })

        // Assert
        await expect(result).resolves.toEqual(variation)
      })
    })
  })
})

describe(`insert`, () => {
  test(`to call db.finance.insert with correct parameters`, async () => {
    // Arrange
    const params = {
      code: `USD`,
      high: `3.8569`,
      low: `3.8564`,
      bid: `3.8563`,
      ask: `3.8565`,
      date: new Date(1560292202000),
    }

    // Act
    financeController.insert(params)

    // Assert
    expect(db.finance.insert).toHaveBeenCalledTimes(1)
    expect(db.finance.insert).toHaveBeenCalledWith({
      code: `USD`,
      high: 3.8569,
      low: 3.8564,
      bid: 3.8563,
      ask: 3.8565,
      date: new Date(1560292202000),
    })
  })
})
