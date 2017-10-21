const connect = require('connect')
const serveStatic = require('serve-static')
const httpProxyMiddleware = require('http-proxy-middleware')
const opn = require('opn')
const fs = require('fs')

const local = false
const proxyConfiy = {
    context: '**/*.do',
    options: {
        target: 'http://127.0.0.1:4000', // must protocol http://
        changeOrigin: true,
        logLevel: 'debug'
    }
}
const app = connect()

app.use(serveStatic('./'))
app.use(function (req, res, next) {
    const bypassUrl = bypass(req, res)

    if (bypassUrl) {
        // req.url = bypassUrl
        // next()
        let content = {}
        try {
            content = fs.readFileSync(bypassUrl, 'utf-8')
            res.statusCode = 200
            // res.setHeader("Content-Type", "charset=UTF-8");
            // res.setHeader("Content-Length", content.length);
            res.end(content)
        } catch (error) {
            res.statusCode = 404
            content.flag = '2'
            content.msg = '系统繁忙，请稍后再试！'
            content.data = {}
            // res.setHeader("Content-Type", "; charset=UTF-8");
            res.end(JSON.stringify(content))
        }
    } else {
        httpProxyMiddleware(proxyConfiy.context, proxyConfiy.options)(req, res, next)
    }

    function bypass (req, res) {
        const matched = /\.do/.test(req.url)

        if (matched) {
            if (local) {
                const localFilePath = 'data/' + req.url.replace(/\//g, '.').replace(/(.*)\.do/, '$1.json').substring(1)
                console.log(('proxy rules 设置为直接返回本地文件 ' + localFilePath))
                return localFilePath
            }
            console.log('[proxy] ' + req.url + ' -> ' + proxyConfiy.options.target + req.url + ' -> ' + req.method)
            return false
        }
    }
})

app.listen(3000)
console.log('Server starting: http://127.0.0.1:3000')
opn('http://127.0.0.1:3000')