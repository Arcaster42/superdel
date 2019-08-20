require('dotenv').config()

module.exports = {
	
	development: {
		client: 'pg',
		connection: process.env.DATABASE_URL || {
			host: process.env.DB_HOST, 
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD, 
			database: process.env.DB_NAME,
			ssl: true
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: __dirname + '/seeds/development'
		}
	
	},

	staging: {
		client: 'pg',
		connection: process.env.DATABASE_URL || {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			ssl: true
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: __dirname + '/seeds/development'
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			tableName: 'knex_migrations'
		}
	}
}
