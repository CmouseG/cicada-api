const sendJson = require('send-data/json')

exports.index = function (req, res, opts) {
    sendJson(req, res, {
        flag: '66688',
        msg: req.url,
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
}