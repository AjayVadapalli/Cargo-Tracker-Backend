# Cargo Shipment Tracker Backend

This is the backend API for the Cargo Shipment Tracker application, built with Node.js, Express, and MongoDB.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

1. Clone the repository

```
git clone <repo-url>
cd cargo-shipment-tracker-backend
```

2. Install dependencies

```
npm install
```

3. Set up environment variables

```
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string and other configuration.

4. Start the server

```
npm run dev
```

The server will start at http://localhost:5000

## API Endpoints

### Shipments

- GET `/api/shipments` - Get all shipments
- GET `/api/shipment/:id` - Get a specific shipment
- GET `/api/shipment/by-container/:containerId` - Get shipment by container ID
- POST `/api/shipment` - Create a new shipment
- POST `/api/shipment/:id/update-location` - Update shipment location
- GET `/api/shipment/:id/eta` - Get estimated time of arrival
- DELETE `/api/shipment/:id` - Delete a shipment

### Cargo Types

- GET `/api/cargo-types` - Get all cargo types
- POST `/api/cargo-types` - Create a new cargo type
- PUT `/api/cargo-types/:id` - Update a cargo type
- DELETE `/api/cargo-types/:id` - Delete a cargo type

## Environment Variables

The following environment variables are used:

- `PORT` - Port on which the server runs (default: 5000)
- `MONGODB_URI` - MongoDB connection string (e.g., mongodb://localhost:27017/cargo-tracker)
- `NODE_ENV` - Environment mode (development/production)

## Data Model

### Shipment

- `containerId` - Unique identifier for the shipping container
- `route` - Array of locations (with coordinates) forming the route
- `currentLocation` - Current location with coordinates and timestamp
- `status` - Current status of the shipment (Loading, In Transit, Delivered, Delayed)
- `departureDate` - Date of departure
- `estimatedArrival` - Estimated arrival date
- `actualArrival` - Actual arrival date (if delivered)
- `cargo` - Information about the cargo (type, weight, unit)
- `notes` - Additional notes about the shipment

### Cargo Type

- `name` - Name of the cargo type
- `description` - Description of the cargo type
- `handlingRequirements` - Special handling requirements
- `specialInstructions` - Specific instructions for handling
- `restrictions` - Any restrictions or limitations
- `icon` - Emoji or icon representing the cargo type

## Assumptions

- The ETA calculation is simplified and based on remaining stops in the route
- Authentication and authorization are not implemented in this MVP
- All dates are stored in UTC
- MongoDB is running locally on the default port (27017)
