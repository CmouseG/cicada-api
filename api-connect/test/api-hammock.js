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
    router.addRoute("/api/error", routes.error.index)

    router(
        mockRequest({
            url: '/api/error',
            headers: { host: 'localhost', bar: 'baz' },
            method: 'GET'
        }),
        mockResponse(function (err, res) {
            assert.ifError(err)

            assert.equal(res.statusCode, 502)
            const body = JSON.parse(res.body)

            assert.deepEqual(body, {
                errors: [
                    {
                        type: 'error',
                        statusCode: 502,
                        message: '系统繁忙，请稍后再试！',
                        _name: 'ErrorError',
                        attribute: 'general'
                    }
                ]
            })

            assert.end()
        })
    )
})