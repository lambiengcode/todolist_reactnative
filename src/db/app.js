const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const mongoURL = 'mongodb+srv://lbc:c3kSqenZZLc6Vshk@cluster0.qt6k6.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'

//const model = require('./Todo')

app.use(bodyParser.json())

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('connected')
})

mongoose.connection.on('error', (err) => {
    console.log('error', err)
})

app.get('/', (req, res) => {
    console.log(req.body)
    res.send('f')
})

app.listen(3000, () => {
    console.log('server running')
})