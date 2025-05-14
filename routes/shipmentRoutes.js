const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

// Get all shipments
router.get('/', shipmentController.getAllShipments);
router.get('/:id', shipmentController.getShipmentById);
router.post('/', shipmentController.createShipment);
router.put('/:id', shipmentController.updateShipment);
router.post('/:id/update-location', shipmentController.updateShipmentLocation);
router.get('/:id/eta', shipmentController.getShipmentETA);
router.delete('/:id', shipmentController.deleteShipment);


module.exports = router;