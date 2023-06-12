const { getAllDataDb, getDataByIdDB, createDataDb, updateDataDb, deleteDataDb, patchDataDb } = require('../repository/user.repository');

async function getAllData() {
    const data = await getAllDataDb();
    if (!data.length) throw new Error('database is not full');
    return data;
}

async function getDataById(id) {
    const data = await getDataByIdDB(id);
    if (!data.length) throw new Error('no such id');
    return data;
}

async function createData(name, surname, birth, city, age) {
    const data = await createDataDb(name, surname, birth, city, age);
    if (!data.length) throw new Error('database is not full');
    return data;
}

async function updateData(id, name, surname, birth, city, age) {
    const data = await updateDataDb(id, name, surname, birth, city, age);
    if (!data.length) throw new Error('no such id');
    return data;
}

async function deleteData(id) {
    const data = await deleteDataDb(id);
    if (!data.length) throw new Error('no such id');
    return data;
}

async function patchData(id, clientData){
    const data = await patchDataDb(id, clientData);
    return data;

}

module.exports = { getAllData, getDataById, createData, updateData, deleteData, patchData };
