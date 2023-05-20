const { getAllDataDb, getDataByIdDB } = require('../repository/user.repository');

async function getAllData() {
    const data = await getAllDataDb();
    if (!data.length) throw new Error('база данных не заполнена');
    return data;
}

async function getDataById(id) {
    const data = await getDataByIdDB(id);
    if (!data.length) throw new Error('такого id нет');
    return data;
}
module.exports = { getAllData, getDataById };