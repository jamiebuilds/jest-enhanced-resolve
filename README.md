# jest-enhanced-resolve

> Use Webpack's [enhanced-resolve](https://github.com/webpack/enhanced-resolve) inside Jest

## Install

```sh
yarn add jest-enhanced-resolve
```

## Usage

Configure Jest to use your own `resolver.js` file:

```json
{
  "resolver": "./resolver.js"
}
```

Configure your `resolver.js` file:

```js
module.exports = require("jest-enhanced-resolve").default({
  mainFields: ["source", "module", "main"],
})
```

See [enhanced-resolve](https://github.com/webpack/enhanced-resolve#resolver-options)
for information on all options.
