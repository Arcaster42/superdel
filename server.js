require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const {
    registerUser, 
    loginUser,
    createOrder,
    deleteOrder,
    getOpenOrders,
    acceptOrder
} = require('./queries')

app.post('/api/users', (req, res) => {
    const userObj = req.body
    registerUser(userObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})

app.get('/api/login', (req, res) => {
    const userObj = req.query
    loginUser(userObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})

app.post('/api/orders', (req, res) => {
    const userObj = req.body.user
    const orderObj = req.body.order
    createOrder(userObj, orderObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})

app.delete('/api/orders', (req, res) => {
    const orderObj = req.body
    deleteOrder(orderObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})

app.get('/api/orders', (req, res) => {
    const driverObj = req.query
    getOpenOrders(driverObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})

app.patch('/api/order', (req, res) => {
    //driver body includes driver's email, and order Obj.
    const driverObj = req.body.driver
    const orderObj = req.body.order
    acceptOrder(driverObj, orderObj)
    .then((results) => {
        console.log(results)
        res.send(results)
    })
})



app.listen(port, () => { console.log(`App listening on ${port}`) })