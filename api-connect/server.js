const http = require('http')
const url = require('url')
const routesRouter = require('routes-router')
const sendJson = require('send-data/json')

const routes = require('./routes')

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

app.addRoute('/api/error', routes.error.index)
app.addRoute('/api', routes.api.index)
app.addRoute('/api/path2', routes.path2.index)

http.createServer(app).listen(4000)
console.log('Web sevice server listening on port 4000')