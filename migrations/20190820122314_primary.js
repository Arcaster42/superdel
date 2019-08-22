exports.up = function(knex) {
	const createUsers = () => {
		return knex.schema.createTable('users', t => {
			t.string('email').primary()
			t.string('first_name')
			t.string('last_name')
			t.string('address')
			t.string('pass_hash')
			t.boolean('staff')
			t.string('phone')
			t.float('lat')
			t.float('lon')
		})
	}

	const createOrders = () => {
		return knex.schema.createTable('orders', t => {
			t.increments()
				.index()
			t.string('purchaser').references('users.email')
			t.string('staff')
			t.boolean('fulfilled')
			t.integer('price')
		})
	}

	const createOrderedItems = () => {
		return knex.schema.createTable('ordered_items', t => {
			t.increments().index()
			t.integer('order_id')
				.references('orders.id')
				.onDelete('CASCADE')
			t.string('product_name')
			t.integer('quantity')
			t.integer('unit_price')
		})
	}

	return Promise.all([createUsers(), createOrders(), createOrderedItems()])
}

exports.down = function(knex,) {
	return knex.schema.dropTable('ordered_items')
				.dropTable('orders')
				.dropTable('users')
}
