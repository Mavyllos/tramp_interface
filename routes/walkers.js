const express = require('express');
const router = express.Router();
const walkersURL="http://lit-garden-29083.herokuapp.com/walkers";
const api = require('./api');


router.get('/', api.getResouces(walkersURL));
router.get('/:id', api.getFilterID(walkersURL));
router.post('/', api.createResource(walkersURL));
router.put('/:id', api.updateResource(walkersURL));
router.delete('/:id', api.deleteResource(walkersURL));


module.exports = router