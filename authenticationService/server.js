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
 
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/users', user);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})