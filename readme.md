# Smart Webpack Import<br/>[![Sponsored by][sponsor-img]][sponsor] [![Version][npm-version-img]][npm] [![Downloads][npm-downloads-img]][npm] [![Build Status Unix][travis-img]][travis] [![Build Status Windows][appveyor-img]][appveyor] [![Dependencies][deps-img]][deps]

[sponsor-img]: https://img.shields.io/badge/Sponsored%20by-Sebastian%20Software-692446.svg
[sponsor]: https://www.sebastian-software.de
[deps]: https://david-dm.org/sebastian-software/babel-plugin-smart-webpack-import
[deps-img]: https://david-dm.org/sebastian-software/babel-plugin-smart-webpack-import.svg
[npm]: https://www.npmjs.com/package/babel-plugin-smart-webpack-import
[npm-downloads-img]: https://img.shields.io/npm/dm/babel-plugin-smart-webpack-import.svg
[npm-version-img]: https://img.shields.io/npm/v/babel-plugin-smart-webpack-import.svg
[travis-img]: https://img.shields.io/travis/sebastian-software/babel-plugin-smart-webpack-import/master.svg?branch=master&label=unix%20build
[appveyor-img]: https://img.shields.io/appveyor/ci/swernerx/babel-plugin-smart-webpack-import/master.svg?label=windows%20build
[travis]: https://travis-ci.org/sebastian-software/babel-plugin-smart-webpack-import
[appveyor]: https://ci.appveyor.com/project/swernerx/babel-plugin-smart-webpack-import/branch/master

Smart Webpack Import has the goal to improve the developer experience when working with so-called dynamic `import()` statements.

## Features

- Automatic chunk names for all imports.
- Respects existing chunk names and keeps them.
- Keeps other magic comments from Webpack in-tact while adding our ones.
- Uses hashes on requester to prevent collisions for identically named imports.


## Installation

```js
"plugins": [
  "babel-plugin-smart-import"
]
```


## Comments

To make this work it's important that your Babel setup keeps comments in-tact as the information
required is carryied over to Webpack via so-called magic comments.

This module exports an additional helper function called `shouldPrintComment` to make this work more easily. It keeps Webpack's Magic Comments and "Pure" markers for Uglify compression. You can pass it over to your Babel config like this:

```js
export default {
  "presets": [...]
  "shouldPrintComment": shouldPrintComment
}
```

Please not that this only works in a JS environment e.g. an exported Rollup or Webpack config. A plain `.babelrc` is not capable of declaring functions or even importing code. With Babel v7 your can use a `.babelrc.js` file as well.

## Example

### Basic

```js
import('./HelloView')

      ↓ ↓ ↓ ↓ ↓ ↓

import(
/*webpackChunkName:'HelloView-zy9ks'*/
'./HelloView');
```

### Keeps Prefetch

```js
import(/* webpackPrefetch: true */ './HelloView')

      ↓ ↓ ↓ ↓ ↓ ↓

import(
/*webpackPrefetch:true,webpackChunkName:'HelloView-zy9ks'*/
'./HelloView');
```



## License

[Apache License Version 2.0, January 2004](license)

## Copyright

<img src="https://cdn.rawgit.com/sebastian-software/sebastian-software-brand/3d93746f/sebastiansoftware-en.svg" alt="Sebastian Software GmbH Logo" width="250" height="200"/>

Copyright 2018<br/>[Sebastian Software GmbH](http://www.sebastian-software.de)
