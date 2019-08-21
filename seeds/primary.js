
/*
return knex.schema.createTable('users', t => {
			t.string('email').primary()
			t.string('first_name')
			t.string('last_name')
			t.string('address')
			t.string('pass_hash')
			t.boolean('staff')
		})
*/

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
				{
					email: 'user1@email.com',
					first_name: 'John-1',
					last_name: 'Doe-1',
					address:
						'B2 Vort, 3 Chome-1-35 Motoazabu, Minato City, Tokyo 106-0046',
					pass_hash: 'password-1',
					staff: true
				},
				{
					email: 'user2@email.com',
					first_name: 'John-2',
					last_name: 'Doe-2',
					address:
						'B2 Vort, 3 Chome-2-35 Motoazabu, Minato City, Tokyo 106-0046',
					pass_hash: 'password-2',
					staff: false
				},
				{
					email: 'staff3@email.com',
					first_name: 'John-3',
					last_name: 'Doe-3',
					address:
						'B2 Vort, 3 Chome-1-35 Motoazabu, Minato City, Tokyo 106-0046',
					pass_hash: 'password-3',
					staff: false
				}
			])
    })
}
