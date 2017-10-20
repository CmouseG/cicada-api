const sendJson = require('send-data/json')

exports.index = function (req, res, opts) {
    sendJson(req, res, {
        flag: '1',
        msg: '/api/path2',
        data: {}
    })
}