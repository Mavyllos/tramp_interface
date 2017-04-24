const express = require('express');
const router = express.Router();
const companiesURL="http://lit-garden-29083.herokuapp.com/companies";
const api = require('./api');

router.get('/', api.getResouces(companiesURL));
router.get('/:id', api.getFilterID(companiesURL));
router.post('/', api.createResource(companiesURL));
router.put('/:id', api.updateResource(companiesURL));
router.delete('/:id', api.deleteResource(companiesURL));

module.exports = router
