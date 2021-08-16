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
