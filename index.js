'use strict';

const debug = require('debug')('koa-66-aggregate');
const fs = require('fs');
const path = require('path');
const Router = require('koa-66');
const walk = require('walk-sync');

module.exports = function(options) {

    if (!options)
        throw new Error('options is required');

    if (typeof options != 'object')
        throw new TypeError('options must be an object')

    if (!options.path)
        throw new Error('options.path is required');

    options.path = path.resolve(options.path);

    const stat = fs.statSync(options.path);

    if(!stat.isDirectory())
        throw new Error('options.path must be a directory');

    options.globs = options.globs || ['**/index.js'];

    if ( options.useFiles)
        options.globs = ['**/*.js'];

    // add more options.
    options.autoPrefix = options.autoPrefix || true;

    const router = new Router();

    if (options.plugins) {
        for(let name in options.plugins) {
            router.plugin(name, options.plugins[name]);
        }
    }

    walk(options.path, {globs: options.globs}).forEach( m => {
        const _path = path.join(options.path, m);
        const abs = path.dirname(_path);
        let route = options.autoPrefix ? abs.split(options.path).pop() || '/' : '/';

        if ( options.useFiles && options.autoPrefix) {
            const fileName = path.basename(m, '.js');
            if ( fileName !== 'index') {
                route = route + '/' + fileName;
            }
        }

        const _router = require(_path);
        router.mount(route , _router);
        debug('mount on %s', route);

    });

    return router;
}
