const getParams = req => ({ ...req.body, ...req.params, ...req.query })

class Handler {
  constructor({ mock, headers, logger }) {
    this.mock = mock
    this.headers = headers
    this.logger = logger
  }

  handle = (req, res) => {
    const params = getParams(req)
    const response = this.mock.getResponse(params)
    const status = this.mock.getStatus(params)

    const responseFn = () => {
      Object.entries(this.headers).forEach(([key, value]) => {
        res.setHeader(key, value)
      })

      this.logger.debug("%s %s %s", this.mock.method.toUpperCase(), status, this.mock.path)
      this.logger.debug("Params: %O", params)
      this.logger.debug("Response: %O", response)

      res.status(status).json(response)
    }

    setTimeout(responseFn, this.mock.delay)
  }
}

module.exports = Handler
