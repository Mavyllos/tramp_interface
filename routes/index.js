const express = require('express');
const router = express.Router();
const http = require('http');
const db = require('../db/connection.js')
const ownersURL = "http://young-anchorage-23408.herokuapp.com/owners";
const dogsURL="http://young-anchorage-23408.herokuapp.com/dogs";
const walkersURL="http://lit-garden-29083.herokuapp.com/walkers";
const companiesURL="http://lit-garden-29083.herokuapp.com/companies";
const rp = require('request-promise')

router.get('/owners', (req, res, next) => {
  rp(ownersURL)
  .then(owners => {
    res.json({owners})
  })
})

router.get('/dogs', (req, res, next) => {
  rp(dogsURL)
  .then(dogs => {
    res.json({dogs})
  })
})

router.get('/walkers', (req, res, next) => {
  rp(walkersURL)
  .then(walkers => {
    res.json({walkers})
  })
})

router.get('/companies', (req, res, next) => {
  rp(companiesURL)
  .then(companies => {
    res.json({companies})
  })
})




module.exports = router;
