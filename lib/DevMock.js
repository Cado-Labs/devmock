const express = require("express")
const glob = require("glob")

const Mock = require("./Mock")
const Handler = require("./Handler")

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

module.exports = DevMock
