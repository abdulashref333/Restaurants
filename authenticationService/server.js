'use strict'
require('dotenv').config();
require('./db/connection.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const user = require('./routes/users');
const auth = require('./routes/auth');

const port = process.evn || 3000;
const app = express();
app.use(bodyParser.json());
// app.use(express.urlencoded({extended:false}));

app.use('/api/auth', auth);
app.use('/api/users', user);

app.listen(port, () => {
  console.log(`http://loacalhost:${port}`);
})