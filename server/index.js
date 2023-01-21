'use strict'
//server dependencies
const express = require('express');
const cors = require('cors');

//dotenv
require('dotenv').config();

//setup
const app = express();
const router = require('./router');

//port & host using .env
const PORT = process.env.PORT || 5000; 
const HOST = process.env.HOST || 'localhost';

//cors
app.use(cors());

//parse
app.use(express.json());

//hook up the router
app.use(router);

//run server
try {
  app.listen(PORT, () => {
    console.log(`listening on http://${HOST}:${PORT}`);
  });
} catch (error) {
  throw new Error(error);
}
