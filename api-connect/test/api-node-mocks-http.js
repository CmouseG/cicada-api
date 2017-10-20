const tape = require('tape')
const mockHttp = require('node-mocks-http')

tape('error node-mocks-http', function(assert) {
    const routeHandler = function (req, res) {
        const id = req.params.id
        console.log('We have a \'%s\' request for %s (ID: %d)', request.method, request.url, id)
        const body = {
            name: 'Bob Dog',
            age: 42,
            email: 'bob@dog.com'
        }

        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.send(JSON.stringify(body), 'utf8');
        res.end();
    }
    const request = mockHttp.createRequest({
        method: 'GET',
        url: '/user/42',
        params: {
            id: 42
        }
    });
    const response = mockHttp.createResponse()
    routeHandler(request, response)
    const data = JSON.parse(response._getData())

    assert.equal('Bob Dog', data.name);
    assert.equal(42, data.age);
    assert.equal('bob@dog.com', data.email);

    assert.equal(200, response.statusCode);
    assert.ok(response._isEndCalled());
    assert.ok(response._isJSON());
    assert.ok(response._isUTF8());

    assert.end();
})