const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.post('/', controller.post);
router.post('/login', controller.authenticate);
router.put('/:id', authService.authorize, controller.put);
router.delete('/', authService.authorize, controller.delete);
router.get('/atual', authService.authorize, controller.getAtual);

module.exports = router;