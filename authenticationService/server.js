'use strict'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.evn || 3000;
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`http://loacalhost:${port}`);
})