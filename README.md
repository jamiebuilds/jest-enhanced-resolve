# jest-enhanced-resolve

> Use Webpack's [enhanced-resolve](https://github.com/webpack/enhanced-resolve) inside Jest

## Install

```sh
yarn add jest-enhanced-resolve
```

## Usage

### Default configuration
This module exposes a resolver that will map your jest config to a compatible enhanced resolver, forwarding options like the extensions, browser target, etc.

```json
{
  "resolver": "jest-enhanced-resolve"
}
```

### Custom resolver
You can also extend this resolver to provide additional options to the enhanced-resolve module.

```json
{
  "resolver": "./resolver.js"
}
```

Configure your `resolver.js` file:

```js
const { create, getDefaultConfig } = require("jest-enhanced-resolve");

module.exports = create((jestConfig) => {
  // By default expected to return all options for
  // https://github.com/webpack/enhanced-resolve#resolver-options

  // You can get a config with the same defaults as the default resolver like so.
  const baseConfig = getDefaultConfig(jestConfig)

  // And modify it to make it your own.
  baseConfig.enforceExtension = true;

  return baseConfig;
});
```

See [enhanced-resolve](https://github.com/webpack/enhanced-resolve#resolver-options)
for information on all options.
