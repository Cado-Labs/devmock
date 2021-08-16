# DevMock

[![CI](https://github.com/Cado-Labs/devmock/actions/workflows/ci.yml/badge.svg)](https://github.com/Cado-Labs/devmock/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/devmock.svg)](https://badge.fury.io/js/devmock)

Webpack Dev Server mocking engine

## Install

```sh
npm i --save devmock
```

or

```sh
yarn add devmock
```

And require it for further usage
```js
const { DevMock } = require("devmock")
```

## Usage

### For `webpack-dev-server` < `4.0`

```js
devServer: {
  before: DevMock.v3({
    mocksPath: path.resolve("mocks/**/*.mock.js")
  })
}
```

### For `webpack-dev-server` >= `4.0`

```js
devServer: {
  onBeforeSetupMiddleware: DevMock.make({
    mocksPath: path.resolve("mocks/**/*.mock.js")
  })
}
```

## API

```js
DevMock.make({
  mocksPath: "mocks/*.mock.js", // glob supported path to your mock files (required)
})
```

`DevMock.make` and `DevMock.v3` has the same params.

## Mock file format

```js
// mocks/exmaple.mock.js

module.exports = {
  path: "/users",           // Query path (required)
  method: "GET",            // HTTP method (optional, default: GET)
  delay: 300,               // Response delay in ms (optional, default: 0)
  status: 200,              // Response status code (options, default: 200)
  response: [               // Response object (optional, default: {})
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Bob" },
  ]
}
```

Both `status` and `response` params can be a function of request params:

```js
module.exports = {
  path: "/users",
  status: params => params.error ? 422 : 200,
  response: params => params.error ? { success: false } : { success: true }
}
```
