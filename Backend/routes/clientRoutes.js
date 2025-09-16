const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.get('/GetClients', clientController.handleGetClients);
router.get('/GetClientById/:id', clientController.handleGetClientById);
router.post('/CreateClient', clientController.handleCreateClient);
router.put('/UpdateClient/:id', clientController.handleUpdateClient);
router.delete('/DeleteClient/:id', clientController.handleDeleteClient);
router.post('/SendUpdate/:id', clientController.handleSendUpdate);

module.exports = router;