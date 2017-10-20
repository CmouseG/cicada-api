const tape = require('tape')
const routesRouter = require('routes-router')
const mockRequest = require('hammock/request')
const mockResponse = require('hammock/response')
const routes = require('../routes')

tape('error hammock', function (assert) {
    const router = routesRouter()

    // router.addRoute("/api/error", function (req, res, opts, cb) {
    //     cb(new Error("some error"))
    // })
    router.addRoute("/some/index.do", routes.some.index)

    router(
        mockRequest({
            url: '/some/index.do',
            // headers: { host: 'localhost', bar: 'baz' },
            method: 'POST'
        }),
        mockResponse(function (err, res) {
            assert.ifError(err)

            assert.equal(res.statusCode, 200)
            const body = JSON.parse(res.body)

            assert.deepEqual(body, {
                flag: '1',
                msg: '/some/index.do',
                data: {
                    a: 1,
                    b: '2',
                    c: [1, 'gg', null, null],
                    d: { some: '' },
                    e: '',
                    f: null
                }
            })

            assert.end()
        })
    )
})