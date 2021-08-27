const express = require('express');
const route = express.Router();
const {authorize} = require('../middleware/authorize');
const {
    getResturantsByQuery,
    creatResturant,
    getResturantById,
    updateResturant,
    deleteResturant
  } = require('../controller/resturantControle');

route.get('/', getResturantsByQuery)

route.post('/', authorize, creatResturant)

route.get('/:id', getResturantById)

route.patch('/:id', authorize, updateResturant)

route.delete('/:id', authorize, deleteResturant)

module.exports = route;