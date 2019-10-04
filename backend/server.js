import express from 'express';
require('dotenv').config({path:'.env'});
const app = express();

const fs = require('fs');
const csv = require('csv-parser');

import * as locations from "../data/stores.json";

function getLocations(req) {

  var stores = []

  locations.Stores.map(x => {
    stores.push(
      {
        name: x.lct_name,
        number: x.lct_nbr,
        geometry: {
          location: {
            lat:x.ltd_msr,
            lng:x.lng_msr
          }
        }
      },
    )
  })
  return stores
}

function getEarth(req) {

  let fileContent = fs.readFileSync('../data/earthquake.csv', {encoding: 'utf8'});
  return fileContent
}

function getLoans(req) {

  let fileContent = fs.readFileSync('../data/Loan_payments_data.csv', {encoding: 'utf8'});
  return fileContent
}

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/react-interview/getLowesStores', (req, res) => res.send(getLocations(req)));
app.get('/react-interview/getEarthQuakes', (req, res) => res.send(getEarth(req)));
app.get('/react-interview/getLoanData', (req, res) => res.send(getLoans(req)));

app.listen(process.env.PORT);
