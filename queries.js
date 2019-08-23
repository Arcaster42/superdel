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
                bcrypt.hash(userObj.password, 10, (err, hash) => {
                    if (err) reject(err)
                    return db('users').insert({ email: userObj.email, pass_hash: hash, first_name: userObj.first_name, last_name: userObj.last_name, address: userObj.address })
                        .then(() => {
                            resolve(userObj)
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
        if (results.length > 0) {
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

const createOrder = (orderObj) => {
  console.log(orderObj)
  return db('orders')
		.insert(
			{
				purchaser: orderObj.email,
				staff: 'none',
				fulfilled: false,
				price: orderObj.price
			},
			['id']
		)
		.then(orderId => {
      console.log('orderID', orderId)
			return Promise.all(
				orderObj.itemArray.map((item, index) => {
					return db('ordered_items').insert({
						order_id: orderId[0]['id'],
						product_name: item,
            quantity: orderObj.quantitiesArray[index],
            unit_price: orderObj.priceArray[index]
					});
				})
			).catch(err => {
				return { err };
			});
		})
		.catch(err => {
			return { err };
		});
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

const getOpenOrders  = () => {
  return db('orders')
    .where('staff', 'none')
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
  console.log('ACCEPT API CALLED')
  console.log(driverObj)
  if (driverObj.staff) {
    return db('orders')
			.where('id', orderObj.id)
			.andWhere('staff', 'none')
			.update({
				staff: driverObj.email
			})
			.then(results => {
				if (results) {
					return results
				} else return { err: 'Already staffed' }
			})
			.catch(err => {
				return { err }
      })
    }
      return new Promise((resolve, reject) => resolve({err: 'must be staff to accept order'}))
    }

 
const fulfillOrder = (driverObj, orderObj) => {
 if (driverObj.staff) {
	return db('orders')
		.where('id', orderObj.id)
		.update({
			fulfilled: true
		})
		.then(results => {
			if (results) {
				return results
			} else return { err: 'Already staffed' }
		})
		.catch(err => {
			return { err }
    })
  }
  return new Promise((resolve, reject) => resolve({err: 'must be staff to fulfill order'}))
}

module.exports = {
    registerUser,
    loginUser,
    createOrder,
    deleteOrder,
    getOpenOrders,
    acceptOrder,
    fulfillOrder
}