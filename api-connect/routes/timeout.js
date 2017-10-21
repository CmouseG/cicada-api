const sendJson = require('send-data/json')

module.exports = function (req, res) {
    res.setTimeout(3000);
    res.on('timeout', function () {
        sendJson(req, res, {
            flag: '3',
            msg: 'timeout',
            data: {}
        })
    })
}