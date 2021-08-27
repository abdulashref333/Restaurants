require('dotenv').config();
require('./db/connection.js');
const express = require('express');
const bodyParser = require('body-parser');
const Resturant = require('./routes/resturant');
const app = express();
const cors = require('cors')

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/resturants', Resturant);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
})