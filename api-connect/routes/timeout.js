import sendJson from 'send-data/json'

export default function (req, res) {
    res.setTimeout(3000);
    res.on('timeout', function () {
        sendJson(req, res, {
            flag: '3',
            msg: 'timeout',
            data: {}
        })
    })
}