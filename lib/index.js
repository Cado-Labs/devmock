const express = require("express")
const glob = require("glob")

const isFunction = item => typeof item === "function"

const getParams = req => ({ ...req.body, ...req.params, ...req.query })

class Mock {
  constructor({ path, method, delay, status, response }) {
    this.path = path.trim()
    this.method = (method || "get").toLowerCase()
    this.delay = delay || 0
    this.getStatus = isFunction(status) ? status : (() => status)
    this.getResponse = isFunction(response) ? response : (() => response)
  }
}

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

class DevMock {
  static make(...args) {
    return new DevMock(...args).middleware
  }

  constructor({ mocksPath }) {
    this.files = glob.sync(mocksPath)
  }

  middleware = ({ app, options, logger }) => {
    const { headers } = options

    app.use(express.json())
    this.files.forEach(file => {
      const mockInfo = require(file)
      const mock = new Mock(mockInfo)
      const handler = new Handler({ mock, headers, logger })

      app[mock.method](mock.path, handler.handle)
    })
  }
}

module.exports = { DevMock }
