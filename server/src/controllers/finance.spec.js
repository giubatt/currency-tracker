const financeController = require(`./finance`)

jest.mock(`../models`)
const db = require(`../models`)

describe(`getVariation`, () => {
  describe(`calculates variation correctly`, () => {
    test(`10 -> 110 = 900%`, async () => {
      // Arrange
      db.finance.selectOne.mockImplementation(async ({ orderAsc }) => {
        if (orderAsc)
          return {
            rows: [{ bid: 10 }],
          }

        return {
          rows: [{ bid: 110 }],
        }
      })

      // Act
      const result = financeController.getVariation({
        code: `USD`,
        startDate: new Date(),
      })

      // Assert
      await expect(result).resolves.toEqual(1000)
    })
    test(`10 -> 11 = 10%`, async () => {
      // Arrange
      db.finance.selectOne.mockImplementation(async ({ orderAsc }) => {
        if (orderAsc)
          return {
            rows: [{ bid: 10 }],
          }

        return {
          rows: [{ bid: 11 }],
        }
      })

      // Act
      const result = financeController.getVariation({
        code: `USD`,
        startDate: new Date(),
      })

      // Assert
      await expect(result).resolves.toEqual(10)
    })
    test(`25 -> 30 = 20%`, async () => {
      // Arrange
      db.finance.selectOne.mockImplementation(async ({ orderAsc }) => {
        if (orderAsc)
          return {
            rows: [{ bid: 25 }],
          }

        return {
          rows: [{ bid: 30 }],
        }
      })

      // Act
      const result = financeController.getVariation({
        code: `USD`,
        startDate: new Date(),
      })

      // Assert
      await expect(result).resolves.toEqual(20)
    })
  })
})
