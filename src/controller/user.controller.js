const express = require('express');
const { getAllData, getDataById } = require('../service/user.service');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});

route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await getDataById(id);
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
});


module.exports = route;