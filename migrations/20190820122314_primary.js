exports.up = function(knex) {
	const createUsers = () => {
		return knex.schema.createTable('users', t => {
			t.string('email').primary()
			t.string('first_name')
			t.string('last_name')
			t.string('address')
			t.string('pass_hash')
			t.boolean('staff')
		})
	}

	const createOrders = () => {
		return knex.schema.createTable('orders', t => {
			t.increments().index()
			t.string('purchaser').references('users.email')
			t.string('staff').references('users.email')
			t.boolean('fulfilled')
		})
	}

	const createOrderedItems = () => {
		return knex.schema.createTable('ordered_items', t => {
			t.increments().index()
			t.integer('order_id').references('orders.id')
			t.string('product_name')
			t.integer('quantity')
		})
	}

	return Promise.all([createUsers(), createOrders(), createOrderedItems()])
}

exports.down = function(knex,) {
	return knex.schema.dropTable('ordered_items')
				.dropTable('orders')
				.dropTable('users')
}
