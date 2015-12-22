'use strict';

const assert = require('assert');

process.env.NODE_ENV = 'test';

const agg = require('..');

const _path = __dirname + '/fixtures';
const _gpath = _path + '/resources';

describe('koa-66-aggregate', () => {

    it('should throw if options is undefined', done => {
        (() => agg()).should.throw('options is required');
        done();
    });

    it('should throw if options is not an object', done => {
        (() => agg(true)).should.throw('options must be an object');
        done();
    });

    it('should throw if options.path is undefined', done => {
        (() => agg({})).should.throw('options.path is required');
        done();
    });

    it('should throw if resources  path not exist', done => {
        (() => agg({path : './bad'})).should.throw(/ENOENT.*/);
        done();
    });

    it('should throw if resources is not a directory', done => {
        (() => agg({path : _path + '/routes/index.js'})).should.throw('options.path must be a directory');
        done();
    });

    it('should work as expected with directory', done => {
        const routes = agg({path: _path + '/routes'});
        routes.should.be.type('object');
        routes.should.have.property('stacks');
        routes.stacks.should.have.length(2);

        routes.stacks[0].should.have.property('path', '/');
        routes.stacks[1].should.have.property('path', '/v1');

        const fn1 = routes.stacks[0].middleware;
        const fn2 = routes.stacks[1].middleware;

        let ctx1 = {};
        fn1(ctx1);
        ctx1.should.have.property('body', 'index');

        let ctx2 = {};
        fn2(ctx2);
        ctx2.should.have.property('body', 'v1/index');
        done();
    });

    it('should work as expected with file', done => {
        const routes = agg({path: _path + '/routes2', useFiles: true});
        routes.should.be.type('object');
        routes.should.have.property('stacks');
        routes.stacks.should.have.length(4);

        routes.stacks[0].should.have.property('path', '/');
        routes.stacks[1].should.have.property('path', '/test');
        routes.stacks[2].should.have.property('path', '/test/toto');
        routes.stacks[3].should.have.property('path', '/v1');

        const fn1 = routes.stacks[0].middleware;
        const fn2 = routes.stacks[1].middleware;
        const fn3 = routes.stacks[2].middleware;
        const fn4 = routes.stacks[3].middleware;

        let ctx1 = {};
        fn1(ctx1);
        ctx1.should.have.property('body', 'index');

        let ctx2 = {};
        fn2(ctx2);
        ctx2.should.have.property('body', 'test/index');
        let ctx3 = {};
        fn3(ctx3);
        ctx3.should.have.property('body', 'test/toto');
        let ctx4 = {};
        fn4(ctx4);
        ctx4.should.have.property('body', 'v1');
        done();
    });

    it('should attach plugin', done => {
        const routes = agg({
            path: _path + '/routes',
            plugins : {
                'test': () => {}
            }
        });
        routes.should.be.type('object');
        routes.should.have.property('stacks');
        routes.stacks.should.have.length(2);

        routes.should.have.property('plugs')
        routes.plugs.should.have.property('test');
        done();


    });


});
