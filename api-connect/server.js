const http = require('http')
const url = require('url')
const routesRouter = require('routes-router')
const sendJson = require('send-data/json')
const typeError = require('error/typed')

const app = routesRouter({
    notFound: function (req, res) {
        sendJson(req, res, {
            statusCode: 404,
            body: {
                flag: '4',
                msg: '404 invalid path',
                data: {}
            }
        })
    },
    errorHandler: function (req, res, err) {
        sendJson(req, res, {
            statusCode: err.statusCode || 500,
            body: {
                flag: '5',
                msg: err.message,
                data: {}
            }
        })
    }
})

app.addRoute('/api/error', function (req, res, opts, cb) {
    // cb(new Error('some error'))
    cb(typeError({
        type: 'error',
        statusCode: 502,
        message: '系统繁忙，请稍后再试！'
    }))
})
app.addRoute('/api', function (req, res, opts) {
    sendJson(req, res, {
        flag: '1',
        msg: '/api',
        data: {
            a: 1,
            b: '2',
            c: [1, 'gg', null, undefined],
            d: {
                some: ''
            },
            e: '',
            f: null,
            g: undefined
        }
    })
})
app.addRoute('/api/path2', function (req, res, opts) {
    sendJson(req, res, {
        flag: '1',
        msg: '/api/path2',
        data: {}
    })
})

http.createServer(app).listen(4000)
console.log('Web sevice server listening on port 4000')