module.exports = async ({ pool }) => {

  const res = await pool.query(`SELECT $1::text as message`, [`Hello world!`])
  console.log(res.rows[0].message) // Hello world!
}
