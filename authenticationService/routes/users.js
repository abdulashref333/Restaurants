const express = require('express');
const route = express.Router();
const { 
  validateSignupPayload,
  validateLoginPayload 
} = require('../middleware/validatPayload');
const { 
    signUp,
    logIn,
    getUserById
  } = require('../controller/user.controler');

route.post('/signup', validateSignupPayload, signUp);

route.post('/login', validateLoginPayload, logIn);

route.get('/:id', getUserById)

module.exports = route;
