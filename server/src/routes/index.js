const Boom = require(`boom`)

// const authRoutes = require(`./auth`)

module.exports = app => {
  // app.use(`/api/auth`, authRoutes)

  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    let error = err
    if (!Boom.isBoom(error)) error = Boom.boomify(error)

    console.error(error) // eslint-disable-line

    return res.status(err.output.payload.statusCode || 500).send(err.output.payload)
  })
}
