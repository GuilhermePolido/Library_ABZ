/**
 * Requisição dos módulos
 */
require('./express');
require('./socket');

/**
 * Declaração das constantes
 */
global.Player = require('./server_source/class/player')

const ObjetosController = require('./server_source/class/objetos_controller');
const LocaisController = require('./server_source/class/locais_controller');

global.objetosController = new ObjetosController();
global.locaisController = new LocaisController();

// Vetor dos players
global.players = {};


/*
 * Envia a lista players pra quem está conectado 
 */
setInterval(function() {
  io.emit('state', players);
}, 1000 / 60);