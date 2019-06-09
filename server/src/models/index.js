require(`dotenv`).config()

const { Pool } = require(`pg`)

const pool = new Pool()

const finance = require(`./finance`)

module.exports = {
  finance: finance({ pool }),
}
