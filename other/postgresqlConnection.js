
const colors = require('colors');

const config = require("../config.json");
const logger = require('./logger');

const pg = require('pg')
const { postgresuser, postgrespassword, postgresdatabase, postgresport, postgreshost } = config;

postconfig = {
  user: postgresuser,
  password: postgrespassword,
  host: postgreshost,
  database: postgresdatabase,
  port: postgresport
}

const client = new pg.Client(postconfig)
async function connect(client) { 
await client.connect((err) => {
    	if (err) { throw err }
	console.log(logger.Postgresql('Connected To Postgres'))
   })
await client.query('CREATE TABLE accounts (pid int, mii_hash1 varchar(256), mii_hash2 varchar(256), nnid varchar(16), screen_name varchar(16), gender varchar(1), birth_date varchar(10), create_date varchar(19), email varchar(255), id varchar(255), country varchar(10), utc_offset int, language varchar(10), mii_url varchar(255), tz_name varchar(255), update_time varchar(255), region int, serviceToken varchar(255), password varchar(255));', (err) => {
	if (!err) {
		console.log(logger.Postgresql("Account tables made"))
	}
	})
}

connect(client).then

function query(input) {
	return client.query({ text: input })
}

module.exports = { query }
