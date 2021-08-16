const express = require("express")
const glob = require("glob")

const Mock = require("./Mock")
const Handler = require("./Handler")

class DevMock {
  static make(...args) {
    return new DevMock(...args).middleware
  }

  static v3(...args) {
    return new DevMock(...args).v3Middleware
  }

  constructor({ mocksPath }) {
    this.files = glob.sync(mocksPath)
  }

  middleware = (...args) => this.v4middleware(...args)

  v3Middleware = (app, { headers }) => this.v4middleware({ app, options: { headers }})

  v4middleware = ({ app, options }) => {
    const { headers } = options
    const logger = console

    app.use(express.json())

    this.files.forEach(file => {
      const mockInfo = require(file)
      const mock = new Mock(mockInfo)
      const handler = new Handler({ mock, headers, logger })

      app[mock.method](mock.path, handler.handle)
    })
  }
}

module.exports = DevMock
