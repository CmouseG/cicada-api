import http from 'http'
import url from 'url'
import routesRouter from 'routes-router'
import sendJson from 'send-data/json'

import * as routes from './routes'

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

app.addRoute('/some/index.do', routes.some)
app.addRoute('/timeout/index.do', routes.timeout)
app.addRoute('/loop/index.do', routes.loop)

http.createServer(app).listen(4000)
console.log('Web sevice server listening on port 4000')