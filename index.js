'use strict';

const debug = require('debug')('koa-66-aggregate');
const fs = require('fs');
const path = require('path');
const Router = require('koa-66');

module.exports = _path => {
    debug('root path: %s', _path);
    const router = new Router();

    fs.readdirSync(_path).forEach(m => {
        const file = path.join(_path, m);
        const _p = '/' + m;
        debug('mount %s on %s', file, _p );
        router.mount('/' + m, require(file));
    });

    return router;
}
