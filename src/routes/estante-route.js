const express = require('express');
const router = express.Router();
const controller = require('../controllers/estante-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.get);
router.get('/atual', authService.authorize, controller.getEstanteAtual);
router.post('/', authService.authorize, controller.post);
router.delete('/', authService.authorize, controller.delete);

module.exports = router;