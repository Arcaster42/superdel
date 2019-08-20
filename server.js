require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const {
    registerUser
} = require('./queries')

app.post('/api/users', (req, res) => {
    const userObj = req.body
    registerUser(userObj)
    .then((results) => res.send(results))
})

app.get('/api/login', (req, res) => {
    const userObj = req.query

})

app.listen(port, () => {console.log(`App listening on ${port}`)})