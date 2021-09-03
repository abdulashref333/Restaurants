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
const {
 validateNewRestaurant,
 validateOldRestaurant
} = require('../middleware/validResturants');

route.get('/', getResturantsByQuery)

route.post('/', [authorize, validateNewRestaurant], creatResturant)

route.get('/:id', getResturantById)

route.patch('/:id', [authorize, validateOldRestaurant], updateResturant)

route.delete('/:id', authorize, deleteResturant)

module.exports = route;