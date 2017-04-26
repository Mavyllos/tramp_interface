'use strict';

const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../db/connection.js');

const router = express.Router();

router.post('/users', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const walker_id = req.body.walker_id;
  const owner_id = req.body.owner_id;

  if (!email || !email.trim()) {
    return next({
      status: 400,
      message: 'Email must not be blank'
    });
  }

  if ((!password) || (password.length < 8)) {
    return next({
      status: 400,
      message: 'Password must be at least 8 characters long'
    });
  }

  knex('users')
  .where('email', email)
  .then((users) => {
    if (users[0]) {
      return next({
        status: 400,
        message: 'Email already exists'
      });
    }
  });

  bcrypt.hash(password, 12)
    .then((hashed_password) => {
      return knex('users')
      .insert({
        user_id,
        walker_id,
        email,
        hashed_password
      }, '*');
    })
    .then(() => {
      user.hashed_password;

      req.session.userId = user.id;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});



module.exports = router;
