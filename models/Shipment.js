const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  arrivalTime: {
    type: Date
  },
  departureTime: {
    type: Date
  }
});

const ShipmentSchema = new mongoose.Schema({
  containerId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  route: {
    type: [LocationSchema],
    required: true
  },
  currentLocation: {
    name: {
      type: String,
      required: true
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  status: {
    type: String,
    enum: ['Loading', 'In Transit', 'Delivered', 'Delayed'],
    default: 'Loading'
  },
  departureDate: {
    type: Date,
    required: true
  },
  estimatedArrival: {
    type: Date,
    required: true
  },
  actualArrival: {
    type: Date
  },
  cargo: {
    type: {
      type: String,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['kg', 'tons'],
      default: 'tons'
    }
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Method to calculate ETA based on current location and route
ShipmentSchema.methods.calculateETA = function() {
  // Find the current position in the route
  const currentLocationName = this.currentLocation.name;
  const routeIndex = this.route.findIndex(location => location.name === currentLocationName);
  
  if (routeIndex === -1 || routeIndex === this.route.length - 1) {
    // If current location is not in route or is the last stop, return the estimated arrival
    return this.estimatedArrival;
  }
  
  // For a real-world application, this would involve complex calculations
  // For now, we'll use a simple calculation based on remaining stops
  const remainingStops = this.route.length - routeIndex - 1;
  const averageTimePerStop = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
  
  const now = new Date();
  const eta = new Date(now.getTime() + (remainingStops * averageTimePerStop));
  
  return eta;
};

module.exports = mongoose.model('Shipment', ShipmentSchema);