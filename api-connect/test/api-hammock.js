const tape = require('tape')
const routesRouter = require('routes-router')
const mockRequest = require('hammock/request')
const mockResponse = require('hammock/response')

tape('error hammock', function (assert) {
    const router = routesRouter()

    router.addRoute("*", function (req, res, opts, cb) {
        cb(new Error("some error"))
    })

    router(
        mockRequest({
            url: '/foo',
            headers: { host: 'localhost', bar: 'baz' },
            method: 'GET'
        }),
        mockResponse(function (err, res) {
            assert.ifError(err)

            assert.equal(res.statusCode, 500)
            const body = JSON.parse(res.body)

            assert.deepEqual(body, {
                errors: [
                    { message: "some error", attribute: "general" }
                ]
            })

            assert.end()
        })
    )
})