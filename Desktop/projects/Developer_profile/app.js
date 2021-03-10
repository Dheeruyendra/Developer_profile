const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');


let api = require('./api');

app.use(express.json());
app.use('/api', api );


app.listen(port, () => {
  console.log(`Server listening at port: ${port}`)
});