const connect = require('connect')
const serveStatic = require('serve-static')
const proxy = require('http-proxy-middleware')
const opn = require('opn')

const app = connect()

app.use(serveStatic('./'))
app.use('/api', proxy({
    target: 'http://127.0.0.1:4000', // must protocol http://
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
        '^/api/path1': '/api/path2'
    }
}))
app.listen(3000)
console.log('Server starting: http://127.0.0.1:3000')
opn('http://127.0.0.1:3000')