import sendJson from 'send-data/json'
import Mock from 'mockjs'

export default function (req, res, opts) {
    sendJson(req, res, Mock.mock({
        flag: '1',
        msg: req.url,
        data: {
            'list|0-2': [{
                'a|+1': 250,
                'b|1-10': '*',
                c: [1, 'gg', null, undefined],
                d: {
                    some: ''
                },
                e: '',
                f: null,
                g: undefined
            }]
        }
    }))
}