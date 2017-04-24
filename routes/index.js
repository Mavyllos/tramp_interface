const express = require('express');
const router = express.Router();
const http = require('http');
const db = require('../db/connection.js')
const ownersURL = "http://young-anchorage-23408.herokuapp.com/owners";
const dogsURL="http://young-anchorage-23408.herokuapp.com/dogs";
const walkersURL="http://lit-garden-29083.herokuapp.com/walkers";
const companiesURL="http://lit-garden-29083.herokuapp.com/companies";
const rp = require('request-promise')

router.get('/owners', getResouces(ownersURL));
router.get('/walkers', getResouces(walkersURL));
router.get('/dogs', getResouces(dogsURL));
router.get('/companies', getResouces(companiesURL));


function getResouces(resource) {
  return function (req, res) {
    rp(resource)
      .then(result => {
        let resultArray = JSON.parse(result);
        console.log(resultArray);
        res.render('index', {resultArray})
    })
  }
}



// router.get('/owners', (req, res, next) => {
//   rp(ownersURL)
//   .then(owners => {
//     let ownersArray = JSON.parse(owners);
//     console.log(ownersArray);
//     res.render('index', {ownersArray})
//   })
// })

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
