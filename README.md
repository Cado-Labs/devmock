# DevMock

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
