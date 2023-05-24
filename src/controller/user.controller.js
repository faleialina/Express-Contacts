const express = require('express');
const { getAllData, getDataById, createData, updateData, deleteData, patchData } = require('../service/user.service');
const { buildResponse } = require('../helper/buildResponse');
const { isValidationUserId, isValidationUserBody } = require('../helper/validation');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});

route.get('/:id', isValidationUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getDataById(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});
route.post('/', isValidationUserBody, async (req, res) => {
    try {
        const { name, surname, birth, city, age } = req.body;
        const data = await createData(name, surname, birth, city, age);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});

route.put('/:id', isValidationUserId, isValidationUserBody, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, birth, city, age } = req.body;
        const data = await updateData(id, name, surname, birth, city, age);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});

route.delete('/:id', isValidationUserId, async (req, res) => {
    try {
        const { id } = req.params;
        const data = await deleteData(id);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message);
    }
});

route.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const clientData = req.body;
        const data = await patchData(id, clientData);
        buildResponse(res, 200, data);
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

module.exports = route;
