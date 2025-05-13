const Shipment = require('../models/Shipment');

// Get all shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.status(200).json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single shipment by ID
exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single shipment by container number
exports.getShipmentByContainerId = async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ containerId: req.params.containerId });
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    res.status(200).json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new shipment
exports.createShipment = async (req, res) => {
  try {
    const newShipment = new Shipment(req.body);
    const savedShipment = await newShipment.save();
    res.status(201).json(savedShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update shipment location
exports.updateShipmentLocation = async (req, res) => {
  try {
    const { name, coordinates } = req.body;
    
    if (!name || !coordinates || !coordinates.latitude || !coordinates.longitude) {
      return res.status(400).json({ message: 'Location name and coordinates are required' });
    }

    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Update current location
    shipment.currentLocation = {
      name,
      coordinates,
      timestamp: new Date()
    };

    // Recalculate ETA when location changes
    const newEta = shipment.calculateETA();
    shipment.estimatedArrival = newEta;

    // Update status based on location if needed
    const isAtFinalDestination = shipment.route[shipment.route.length - 1].name === name;
    if (isAtFinalDestination) {
      shipment.status = 'Delivered';
      shipment.actualArrival = new Date();
    } else {
      shipment.status = 'In Transit';
    }

    const updatedShipment = await shipment.save();
    res.status(200).json(updatedShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get shipment ETA
exports.getShipmentETA = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    
    const eta = shipment.calculateETA();
    
    res.status(200).json({ 
      shipmentId: shipment._id, 
      containerId: shipment.containerId,
      currentLocation: shipment.currentLocation,
      estimatedArrival: eta
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a shipment
exports.deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }
    
    await Shipment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};