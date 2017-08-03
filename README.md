# xy-parser

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![Test coverage][codecov-image]][codecov-url]
  [![npm download][download-image]][download-url]

Parse a text-file and convert it to an array of XY points.

## Installation

`$ npm install --save xy-parser`

## Usage
```js
import {parseXY} from 'xy-parser'
var result = parseXY('1 2\r3 4');
```

Or with options:

```js
import {parseXY} from 'xy-parser'
var result = parseXY(data,{
    uniqueX: true,
    arrayType: 'xxyy',
    normalize: true
});
```

## [API Documentation](https://cheminfo-js.github.io/xy-parser/)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/xy-parser.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/xy-parser
[travis-image]: https://img.shields.io/travis/cheminfo-js/xy-parser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/xy-parser
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo-js/xy-parser.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo-js/xy-parser
[download-image]: https://img.shields.io/npm/dm/xy-parser.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/xy-parser
