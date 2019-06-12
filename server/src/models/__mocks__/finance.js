module.exports = () => {
  return {
    insert: jest.fn(),
    select: jest.fn(() => ({ rows: [] })),
    selectOne: jest.fn(() => ({ rows: [] })),
  }
}
