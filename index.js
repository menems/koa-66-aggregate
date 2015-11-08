'use strict';

const debug = require('debug')('koa-66-aggregate');
const fs = require('fs');
const path = require('path');
const Router = require('koa-66');

const walk = (modulesPath, excludeDir, callback) => {
    fs.readdirSync(modulesPath).forEach(file => {
        const newPath = path.join(modulesPath, file);

        const stat = fs.statSync(newPath);

        if (stat && stat.isFile() && /^index\.(js|coffee)$/.test(file))
            return callback(newPath);

        if (stat && stat.isDirectory() && file !== excludeDir)
            return walk(newPath, excludeDir, callback);
    });
};

module.exports = _path => {

    if (!_path) throw new Error('_path is required');

    const stat = fs.statSync(_path);
    if(!stat.isDirectory()) throw new Error('_path must be a directory');

    const router = new Router();

    walk(_path, null, m => {
        const route_path = path.dirname(m).split(_path).pop();
        debug('mount on %s', route_path);
        router.mount(route_path, require(m));
    });

    return router;
}
