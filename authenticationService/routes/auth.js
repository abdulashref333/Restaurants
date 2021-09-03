const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

route.get('/me', async (req, res, next) => {
  try {
    const auhteHeader = req.headers.authorization;
    const token = auhteHeader && auhteHeader.split(' ')[1];
    console.log(token);

    if (!token) return res.status(401);
    
    console.log('secret: ', process.env.JWT_SCERET_KEY);
    const user = await jwt.verify(token, process.env.JWT_SCERET_KEY) 
    console.log(user);

    if (!user) return res.status(401).send('invalid token');
    // modifing the user object befor sending.
    user.userId = user.id ;
    delete user.id;
    
    res.send(user);
    
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = route;
