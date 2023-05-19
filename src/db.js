const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'university',
    password: 'Falinka1603',
    port: '5432',
});

module.exports = { pool };
