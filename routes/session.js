'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../db/connection.js');
const rp = require('request-promise')

const router = express.Router();

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  console.log('in post', req.body);
  if (!email || !email.trim()) {
    return next({
      status: 400,
      message: 'Email must not be blank'
    });
  }

  if (!password) {
    return next({
      status: 400,
      message: 'Password must not be blank'
    });
  }

  let user;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        throw {
          status: 400,
          message: 'Bad email or password'
        };
      }

      user = row;

      return bcrypt.compare(password, user.hashed_password);
    })
    .then(() => {
      delete user.hashed_password;
      req.session.userId = user.owner_id;

    })
    .then(() => {
      let request = `https://young-anchorage-23408.herokuapp.com/owners/${user.owner_id}`;


      rp(request)
        .then((result)=> {
          let resultArray = JSON.parse(result);
          res.render('showDataOwners', {
          result: resultArray });
        })
    })

    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw {
        status: 400,
        message: 'Bad email or password'
      };
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {
  req.session = null;

  res.sendStatus(200);
});

module.exports = router;
