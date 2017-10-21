import sendJson from 'send-data/json'

export default function (req, res, opts) {
    sendJson(req, res, {
        flag: '1',
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