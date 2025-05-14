const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

// Get all shipments
router.get('/shipment', shipmentController.getAllShipments);
router.get('/shipment/:id', shipmentController.getShipmentById);
router.post('/shipment', shipmentController.createShipment);
router.put('/shipment/:id', shipmentController.updateShipment);
router.post('/shipment/:id/update-location', shipmentController.updateShipmentLocation);
router.get('/shipment/:id/eta', shipmentController.getShipmentETA);
router.delete('/shipment/:id', shipmentController.deleteShipment);



module.exports = router;