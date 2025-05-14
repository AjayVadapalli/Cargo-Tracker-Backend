const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

router.get('/shipments', shipmentController.getAllShipments);

// Get a single shipment by ID
router.get('/shipment/:id', shipmentController.getShipmentById);

// Get a single shipment by container number
router.get('/shipment/by-container/:containerId', shipmentController.getShipmentByContainerId);

// Create a new shipment
router.post('/shipment', shipmentController.createShipment);
    
// Update shipment location
router.post('/shipment/:id/update-location', shipmentController.updateShipmentLocation);

router.put('/shipment/:id', shipmentController.updateShipment);

// Get shipment ETA
router.get('/shipment/:id/eta', shipmentController.getShipmentETA);

// Delete a shipment
router.delete('/shipment/:id', shipmentController.deleteShipment);


module.exports = router;