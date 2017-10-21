import sendJson from 'send-data/json'

let count = 0

export default function (req, res) {
    count++
    if (count === 5) {
        sendJson(req, res, {
            flag: '1',
            msg: '',
            data: {
                status: 'T'
            }
        })
        count = 0
    } else {
        sendJson(req, res, {
            flag: '1',
            msg: '',
            data: {
                status: 'F'
            }
        })
    }
}