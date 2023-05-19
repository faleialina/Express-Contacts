const express = require('express');
const { getAllData } = require('../service/user.service');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const data = await getAllData();
        res.send(data);
    } catch (error) {
        res.send(error.message)
    }
});

route.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getDataById();
    res.send(data);
})


module.exports = route;