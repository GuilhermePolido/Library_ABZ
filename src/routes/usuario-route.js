const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.post('/login', controller.authenticate);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;