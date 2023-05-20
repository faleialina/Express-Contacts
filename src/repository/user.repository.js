const { pool } = require('../db');

async function getAllDataDb() {
    const client = await pool.connect();
    const sql = 'SELECT users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id ';
    const result = (await client.query(sql)).rows;
    return result;
}

async function getDataByIdDB(id) {
    const client = await pool.connect();
    const sql = 'SELECT users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id WHERE users.info_id =$1';
    const result = (await client.query(sql, [id])).rows;
    return result;
}





module.exports = { getAllDataDb, getDataByIdDB };