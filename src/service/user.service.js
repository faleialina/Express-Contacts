const { getAllDataDb } = require('../repository/user.repository');

async function getAllData() {
    const data = await getAllDataDb();
    if (!data.length) throw new Error('база данных не заполнена');
    return data;
}

module.exports = { getAllData };