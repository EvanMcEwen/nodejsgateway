const express = require('express')

const request = require('request-promise-native')
const serviceAURI = 'http://servicea:3000'
const serviceBURI = 'http://serviceb:3000'

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello From The API Gateway!'))

//Middleware for checking bearer tokens?

var authorizationCheck = function (req, res, next) {
    token = req.get('Authorization')
    if (token == null) {
        console.log('Denied Request: Missing Bearer Token')
        res.sendStatus(403);
    } else {
        console.log('Request Accepted')
        next()
    }
}

app.use(authorizationCheck)

app.get('/servicea', async (req, res) => {
    const theResponse = await request(serviceAURI)
    res.send(theResponse)
})

app.get('/serviceb', async (req, res) => {
    const theResponse = await request(serviceBURI)
    res.send(theResponse)
})

app.get('/servicea_json', async (req, res) => {
    const theResponse = await request(serviceAURI)
    newResponse = {
        'message': theResponse
    }
    res.json(newResponse)
})

app.get('/serviceb_json', async (req, res) => {
    const theResponse = await request(serviceBURI)
    newResponse = {
        'message': theResponse
    }
    res.json(newResponse)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
