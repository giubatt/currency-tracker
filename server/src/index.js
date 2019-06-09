const express = require(`express`)
const cors = require(`cors`)
const bodyParser = require(`body-parser`)

require(`dotenv`).config()

const routes = require(`./routes`)

const app = express()
const port = process.env.PORT

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app)

// eslint-disable-next-line
app.listen(port, () => console.log(`Currency Tracker app listening on port ${port}!`))
