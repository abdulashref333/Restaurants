'use strict'
require('dotenv').config();
require('./db/connection.js');
//modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
//routes
const app = express();
const user = require('./routes/users');
const auth = require('./routes/auth');
const port = process.evn || 3000;
 
const whitelist = ['http://localhost:4200', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// app.use(cors(corsOptions))
app.use(cors());
app.use(bodyParser.json());
// app.use(express.urlencoded({extended:false}));

app.use('/api/auth', auth);
app.use('/api/users', user);

app.listen(port, () => {
  console.log(`http://loacalhost:${port}`);
})