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
                        .then(() => {
                            userObj.password = null
                            resolve(userObj)
                        })
                        .catch((err) => reject(err))
                })
            })
        }
        else return { err: 'Username Unavailable' }
    })
    .catch((err) => { return err })
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
                userObj.password = null
                resolve(userObj) 
            }})
          })
        }
        else return { err: 'Username Not Found' }
      }).catch((err) => { return err })
} 

module.exports = {
    registerUser,
    loginUser
}