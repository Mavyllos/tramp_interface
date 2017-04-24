const express = require('express');
const router = express.Router();
const ownersURL = "http://young-anchorage-23408.herokuapp.com/owners";
const api = require('./api');

router.get('/', api.getResouces(ownersURL));
router.get('/:id', api.getFilterID(ownersURL));
router.post('/', api.createResource(ownersURL));
router.put('/:id', api.updateResource(ownersURL));
router.delete('/:id', api.deleteResource(ownersURL));


module.exports = router;
