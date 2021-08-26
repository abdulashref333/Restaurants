const express = require('express');
const route = express.Router();
const got = require('got');
const {Resturant} = require('../model/resturant');
const AUTHENTICATION_URL = 'http://localhost:3000';

route.get('/:id', async (req, res) => {
  try {
    const resturantId = req.params.id;
    const resturant = await Resturant.findById(resturantId).exec();
    if(!resturant) return res.status(404).send({error: 'id not found'});
    res.send(resturant);  
  } catch (error) {
    res.status(500).send({error});
  }
})

route.get('/', async (req, res) => {
  const resturants = await Resturant.find({});
  res.send(resturants);
})

route.post('/', async(req, res) => {
  try {
    // console.log('i am here..', req.headers.authorization)

    const {body, statusCode} = await got(AUTHENTICATION_URL+'/api/auth/me', {
      headers: {authorization: req.headers.authorization},
      responseType: 'json'
    })

    if( statusCode !== 200 || !body.userId) return res.status(401).send({error:'unautorized user'});
    console.log('resbonse: ', {body, statusCode});

    console.log('req body: ', req.body)
    const resturant = new Resturant({
      name: req.body.name,
      address: req.body.address,
      userId: body.userId
    })

    await resturant.save();
    res.send({resturant});

  } catch (error) {
    res.status(500).send({error})
  }
})

route.delete('/:id', async (req, res) => {
  try {
    const resturantId = req.params
    const {body, statusCode} = await got(AUTHENTICATION_URL+'/api/auth/me', {
      headers: {authorization: req.headers.authorization},
      responseType: 'json'
    })

    if( statusCode !== 200 || !body.userId) return res.status(401).send({error:'unautorized user'});
    console.log('resbonse: ', {body, statusCode});

    if(!resturantId) return res.status(404).send({error: 'id was not found'});
    let resturant = await Resturant.find({_id: req.params.id, userId:body.userId}).exec();
    console.log('resbonse: ', resturant)
    // console
    if(!resturant.length) return res.status(404).send({error: 'no resturant with this id'});

    resturant = await Resturant.findByIdAndRemove(req.params.id).exec();
    res.send({sucess:true});

  } catch (error) {
    res.status(500).send({error})
  }
})

//patch...
module.exports = route;