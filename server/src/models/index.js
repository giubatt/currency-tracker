require(`dotenv`).config()

console.log(process.env)

const { Pool } = require(`pg`)

const pool = new Pool()

const finance = require(`./finance`)

module.exports = {
  finance: finance({ pool }),
}
