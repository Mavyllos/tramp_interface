const express = require('express');
const router = express.Router();
const walkersURL="http://lit-garden-29083.herokuapp.com/walkers";
const api = require('./api');


router.get('/', api.getResouces(walkersURL));
router.get('/:id', api.getFilterIDWalker(walkersURL));
router.post('/', api.createResource(walkersURL));
router.put('/:id', api.updateResourceWalker(walkersURL));
router.delete('/:id', api.deleteResource(walkersURL));


module.exports = router
