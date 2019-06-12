module.exports = () => {
  return {
    insert: jest.fn(),
    select: jest.fn(),
    selectOne: jest.fn(),
  }
}
