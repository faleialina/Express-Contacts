const { pool } = require('../db');

async function getAllDataDb() {
    const client = await pool.connect();
    const sql = 'SELECT users.id, users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id ';
    const result = (await client.query(sql)).rows;
    return result;
}

async function getDataByIdDB(id) {
    const client = await pool.connect();
    const sql = 'SELECT  users.id, users.name, users.surname, users_info.birth FROM users_info JOIN users ON users.info_id = users_info.id WHERE users.id =$1';
    const result = (await client.query(sql, [id])).rows;
    return result;
}

async function createDataDb(name, surname, birth, city, age) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = 'INSERT INTO users_info (birth, city, age) VALUES($1, $2, $3) RETURNING *';
        const result = (await client.query(sql, [birth, city, age])).rows;

        const sql_2 = 'INSERT INTO users (name, surname, info_id) VALUES($1, $2, $3) RETURNING *';
        const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;

        await client.query('COMMIT');

        return [{ ...result[0], ...result_2[0] }];
    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }

}


async function updateDataDb(id, name, surname, birth, city, age) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE users_info set birth = $1, city= $2, age= $3 WHERE id = $4 RETURNING *';
        const result = (await client.query(sql, [birth, city, age, id])).rows;

        const sql_2 = 'UPDATE users SET name = $1, surname= $2  WHERE info_id = $3 RETURNING *';
        const result_2 = (await client.query(sql_2, [name, surname, result[0].id])).rows;

        await client.query('COMMIT');
        return [{ ...result[0], ...result_2[0] }];

    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

async function deleteDataDb(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const sql = 'DELETE FROM users_info WHERE id =$1 RETURNING *';
        const result = (await client.query(sql, [id])).rows;

        const sql_2 = 'DELETE FROM users WHERE info_id =$1 RETURNING *';
        const result_2 = (await client.query(sql_2, [id])).rows;

        await client.query('COMMIT');

        return [{ ...result[0], ...result_2[0] }];

    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }

}

async function patchDataDb(id, clientData) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql_1 = 'SELECT * FROM users_info JOIN users ON users.info_id = users_info.id WHERE users.info_id =$1';
        const oldData = (await client.query(sql_1, [id])).rows;

        const newObject = { ...oldData[0], ...clientData }

        const sql_2 = 'UPDATE users_info set birth = $1, city= $2, age= $3 WHERE id = $4 RETURNING *';
        const result = (await client.query(sql_2, [newObject.birth, newObject.city, newObject.age, id])).rows;

        const sql_3 = 'UPDATE users SET name = $1, surname= $2  WHERE info_id = $3 RETURNING *';
        const result_2 = (await client.query(sql_3, [newObject.name, newObject.surname, result[0].id])).rows;

        await client.query('COMMIT');

        return { ...result[0], ...result_2[0] };

    } catch (error) {
        await client.query('ROLLBACK');

        throw new Error(error.message);
    }
}

module.exports = { getAllDataDb, getDataByIdDB, createDataDb, updateDataDb, deleteDataDb, patchDataDb };
