require('dotenv').config()
const environment = process.env.NODE_ENV || 'development'
const knexFile = require('./knexfile')[environment]
const db = require('knex')(knexFile)
const bcrypt = require('bcrypt')

const registerUser = (userObj) => {
  return db('users').where('email', userObj.email)
    .then((results) => {
        if (results.length < 1) {
            return new Promise((resolve, reject) => {
                bcrypt.hash(userObj.password, 37, (err, hash) => {
                    if (err) reject(err)
                    return db('users').insert({ email: userObj.email, pass_hash: hash })
                        .then((user) => {
                            user.password = null
                            resolve(user)
                        })
                        .catch((err) => reject(err))
                })
            })
        }
        else return { err: 'Username Unavailable' }
    })
    .catch((err) => { return { err } })
 }

const loginUser = (userObj) => {
    return db('users').where('email', userObj.email)
      .then((results) => {
        if (results.length === 1) {
          const user = results[0]
            return new Promise((resolve, reject) => {
            bcrypt.compare(userObj.password, user.pass_hash, (err, same)=> {
              if (err) reject(err)
              if(!same) reject({ err: 'Invalid Credentials' })
              if (same) {
                user.password = null
                resolve(user) 
            }})
          })
        }
        else return { err: 'Username Not Found' }
      }).catch((err) => { return { err } })
}

const createOrder = (userObj, orderObj) => {
  return db('orders').insert({
    purchaser: userObj.email,
    staff: 'none',
    fulfilled: false,
  }, ['id']).then((orderId) => {
    return Promise.all(orderObj.items.map((item, index) => {
      return db('ordered_items').insert({
      order_id: orderId,
      product_name: item,
      quantity: orderObj.quantity[index]
    })
  })).catch((err) => { return { err } })
  }).catch((err) => { return { err } })
}

const deleteOrder = (orderObj) => {
  return db('orders')
    .where('id', orderObj.id).andWhere('staff', 'none')
      .del()
      .then((results) => {
        if (results) {
          return orderObj
        }
        else return { err: 'Driver has accepted order and is enroute' }
      })
      .catch((err) => { return { err } })
}

const getOpenOrder  = (driverObj) => {
  return db('orders')
    .where('staff', 'none')
    // .andWhere('city', driverObj.city)
    // Some way to identify orders within range of the driver?
      .select()
      .then((results) => {
        if (results.length > 0) {
          return results
        }
        else return { err: 'No available orders' }
      })
      .catch((err) => { return { err } })
    }

const acceptOrder = (driverObj, orderObj) => {
  return db('orders')
    .where('id', orderObj.id).andWhere('staff', 'none')
      .update({
        staff: driverObj.email
      })
      .then((results) => {
        if (results) {
          return results
        }
        else return { err: 'Already staffed' }
      }) 
      .catch((err) => { return { err } })
    }


module.exports = {
    registerUser,
    loginUser,
    createOrder,
    deleteOrder,
    getOpenOrder,
    acceptOrder
}