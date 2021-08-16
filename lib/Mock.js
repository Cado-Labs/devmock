const isFunction = item => typeof item === "function"

class Mock {
  constructor({ path, method, delay, status, response }) {
    this.path = path.trim()
    this.method = (method || "get").toLowerCase()
    this.delay = delay || 0
    this.getStatus = isFunction(status) ? status : (() => status || 200)
    this.getResponse = isFunction(response) ? response : (() => response || {})
  }
}

module.exports = Mock
