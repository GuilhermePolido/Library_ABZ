const express = require('express');
const router = express.Router();
const controller = require('../controllers/livro-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/:id', controller.getById);
router.get('/find/:name', controller.findByName);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;