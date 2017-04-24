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

router.get('/owners/:id', getFilterID(ownersURL));
router.get('/walkers/:id', getFilterID(walkersURL));
router.get('/dogs/:id', getFilterID(dogsURL));
router.get('/companies/:id', getFilterID(companiesURL));

router.post('/owners', createResource(ownersURL));
router.post('/walkers', createResource(walkersURL));
router.post('/dogs', createResource(dogsURL));
router.post('/companies', createResource(companiesURL));

router.put('/owners/:id', updateResource(ownersURL));
router.put('/walkers/:id', updateResource(walkersURL));
router.put('/dogs/:id', updateResource(dogsURL));
router.put('/companies/:id', updateResource(companiesURL));

router.delete('/owners/:id', deleteResource(ownersURL));
router.delete('/walkers/:id', deleteResource(walkersURL));
router.delete('/dogs/:id', deleteResource(dogsURL));
router.delete('/companies/:id', deleteResource(companiesURL));


function getResouces(resource) {
  return function (req, res) {
    rp(resource)
      .then(result => {
        let resultArray = JSON.parse(result);
        res.render('indexData', {resultArray})
    })
  }
}


function getFilterID(resource) {
  return function (req, res) {
    let id = req.params.id;
    let request = `${resource}${'/'}${id}`;
    rp(request)
    .then(result => {
      let resultArray = JSON.parse(result);
      res.render('showData', {
        result: resultArray
      })
    })
  }
}

function createResource(resource) {
  return function (req,res) {
    let create = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(create) {
      for (let propName in create) {
        if (create[propName] === null || create[propName] === undefined) {
          delete create[propName];
        }
      }
    }
    clean(create)

    let request = {
              method: 'POST',
              uri: resource,
              body: create,
              json: true
            };
    rp(request)
    .then(result => {
      res.render('indexData', {result})
    })
  }
}


function updateResource(resource) {
  return function (req,res) {
    let id = req.params.id
    let update = {
      owner_id: req.body.owner_id,
      walker_id: req.body.walker_id,
      name: req.body.name,
      description: req.body.description,
      logo_img: req.body.logo_img,
      url: req.body.url,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address_line_1: req.body.address_line_1,
      address_line_2: req.body.address_line_2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip ,
      phone_number: req.body.phone_number,
      email_address: req.body.email_address,
      user_id: req.body.user_id,
      breed: req.body.breed,
      size: req.body.size,
      allergies: req.body.allergies,
      kids: req.body.kids,
      other_dogs: req.body.other_dogs,
      other_people: req.body.other_people,
      fav_treat: req.body.fav_treat,
      bio: req.body.bio,
      image: req.body.image,
    }
    function clean(update) {
      for (let propName in update) {
        if (update[propName] === null || update[propName] === undefined) {
          delete update[propName];
        }
      }
    }
    clean(update)

    let request = {
              method: 'PUT',
              uri: `${resource}${'/'}${id}`,
              body: update,
              json: true
            };
    rp(request)
    .then(result => {
      res.render('indexData', {result})
    })
  }
}


function deleteResource(resource) {
  return function (req,res) {
    let id = req.params.id

    let request = {
              method: 'DELETE',
              uri: `${resource}${'/'}${id}`,
              json: true
            };
    rp(request)
    .then(result => {
      res.render('indexData', {result})
    })
  }
}

module.exports = router;
