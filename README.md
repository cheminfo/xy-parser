# XY text file parser

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

XY file parser allows to convert a text file to an array of XY.

## Example of use:
```js
var parseXY = require('xy-parser');
var result = parseXY.parse('1 2\r3 4');
```

Or with options:

```js
var parseXY = require('xy-parser')
var result = XYParser.parse(data,
    {
        uniqueX: true,
        arrayType: 'xxyy',
        normalize: true
    }
);
```



## Options

* normalize: will set the maximal value to 1
* arrayType:
  * 'xxyy' `[[x1,x2,x3,...],[y1,y2,y2,...]]`
  * 'xyxy' `[[x1,y1],[x2,y2],[x3,y3], ...]]` (default)
* uniqueX: Make the X values unique (works only with xxyy format). If the X value is repeated the sum of Y is done.

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/xy-parser.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/xy-parser
[travis-image]: https://img.shields.io/travis/cheminfo-js/xy-parser/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/cheminfo-js/xy-parser
[david-image]: https://img.shields.io/david/cheminfo-js/xy-parser.svg?style=flat-square
[david-url]: https://david-dm.org/cheminfo-js/xy-parser
[download-image]: https://img.shields.io/npm/dm/cheminfo-js/xy-parser.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/xy-parser
