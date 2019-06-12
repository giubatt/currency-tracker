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
