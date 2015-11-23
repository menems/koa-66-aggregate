## koa-66-aggregate

[![Node.js Version][node-image]][node-url]
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Dependency Status][dep-image]][dep-url]
[![Coverage Status][cov-img]][cov-url]

Aggregate `koa-66` Router from directories.

## Installation

```
npm install koa-66-aggregate
```
## Options
- `path` : path of routes directories
- `plugins` : object of plugins available on each router instance
- `globs` : default : ['**/index.js']

## Example

```
routes/
	index.js
	v1/
		index.js
```
Each `index.js` exports an instance of koa-66

```
const aggregate = require('koa-66-aggregate');

const router = aggregate({path: './routes'});
```

It's use `mount()` methods of koa-66, prefixed by 	the name of the directory.
So all routes contans on v1/index.js will be prefixed by /v1

[node-image]: https://img.shields.io/node/v/koa-66-aggregate.svg?style=flat-square
[node-url]: https://nodejs.org
[npm-image]: https://img.shields.io/npm/v/koa-66-aggregate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-66-aggregate
[travis-image]: https://img.shields.io/travis/menems/koa-66-aggregate/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/menems/koa-66-aggregate
[cov-img]: https://coveralls.io/repos/menems/koa-66-aggregate/badge.svg?branch=master&service=github
[cov-url]: https://coveralls.io/github/menems/koa-66-aggregate?branch=master
[dep-image]: http://david-dm.org/menems/koa-66-aggregate.svg?style=flat-square
[dep-url]:http://david-dm.org/menems/koa-66-aggregate
