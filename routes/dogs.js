const express = require('express');
const router = express.Router();
const dogsURL="http://young-anchorage-23408.herokuapp.com/dogs";
const api = require('./api');


router.get('/', api.getResouces(dogsURL));
router.get('/:id', api.getFilterID(dogsURL));
router.post('/', api.createResource(dogsURL));
router.put('/:id', api.updateResource(dogsURL));
router.delete('/:id', api.deleteResource(dogsURL));

module.exports = router
