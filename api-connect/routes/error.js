const typeError = require('error/typed')

exports.index = function (req, res, opts, cb) {
    // cb(new Error('some error'))
    cb(typeError({
        type: 'error',
        statusCode: 502,
        message: '系统繁忙，请稍后再试！'
    }))
}