# GeoSentinel — Cloud-Deployed Geospatial Disaster Monitoring System

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?logo=docker)
![Three.js](https://img.shields.io/badge/Three.js-0.160-000000?logo=three.js)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

## Overview

Cloud-native disaster risk platform ingesting multisource raster/vector satellite data via containerised pipelines with serverless NDVI & water-body extent modules triggering automated district-level flood alerts.

## Tech Stack

- **Frontend**: React 18, Three.js (react-three-fiber), Tailwind CSS, Recharts, React-Leaflet
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT with bcrypt password hashing
- **File Processing**: Multer for file uploads, JSON2CSV for exports
- **Deployment**: Docker & Docker Compose, MongoDB Atlas (cloud)

## Features

- Interactive 3D Earth globe with real-time disaster alert markers
- Real-time NDVI index monitoring with threshold-based alerting
- Water body extent tracking over time
- District-level risk heatmap with choropleth visualization
- Automated alert engine (triggers when NDVI < 0.3 OR waterExtent > 300km²)
- Satellite data upload center supporting .tif, .tiff, .geojson, .shp, .zip, .csv
- Live alert feed with WebSocket/polling updates
- Pipeline status monitoring (Ingestion, Processing, Alert Engine)
- CSV export for alerts and processing reports
- JWT-protected routes with role-based access

## Cloud Deployment Architecture

```
                    Internet
                       │
              ┌────────┴────────┐
              │   Your Domain   │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │  Docker Server  │
              │  (Any Cloud VPS)│
              │  - client        │
              │  - server        │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │  MongoDB Atlas   │
              │  (Free Tier M0)  │
              └─────────────────┘
```

**Free Cloud Services Used:**
- **MongoDB Atlas M0**: Free 512MB cluster, shared RAM
- **Any VPS with Docker**: DigitalOcean ($4/mo), Linode, Vultr, or even a local machine

## Setup Instructions

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas account (free)

### Step 1: MongoDB Atlas Setup (FREE)

1. Go to https://www.mongodb.com/atlas
2. Create free account
3. Create a free cluster (M0 Sandbox)
   - Provider: AWS
   - Region: Nearest to you
4. Create database user:
   - Username: `geosentinel_admin`
   - Password: (generate secure password - save it!)
5. Network access: Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Get connection string:
   ```
   mongodb+srv://geosentinel_admin:<password>@cluster.xxxxx.mongodb.net/geosentinel?retryWrites=true&w=majority
   ```

### Step 2: Clone and Configure

```bash
# Clone the repository
git clone <repository-url>
cd geosentinel

# Configure server
cd server
cp .env.example .env

# Edit .env - replace MONGO_URI with your Atlas connection string
nano .env
```

### Step 3: Docker Deployment

```bash
# From project root (where docker-compose.yml is)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access the application at `http://localhost:5173`

### Step 4: Seed Database

```bash
# Enter server container
docker-compose exec server sh

# Seed the database
npm run seed

# Exit container
exit
```

**Demo Credentials:**
- Email: `admin@geosentinel.com`
- Password: `GeoSentinel@2026`

## Deploying to Production VPS

### On your VPS (Ubuntu 22.04):

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Log out and back in, then:
git clone <your-repo-url>
cd geosentinel/server
cp .env.example .env
nano .env  # Add your MongoDB Atlas URI

# Start with Docker
docker-compose up -d --build

# Setup auto-restart
sudo systemctl enable docker
```

## Local Development with Docker

```bash
# Start only database (use Atlas for production)
docker-compose up -d mongodb

# Run server locally (with your local Node.js)
cd server && npm run dev

# Run client locally
cd client && npm run dev
```

## API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alerts` | List all alerts (filter: district, severity, type, status) |
| POST | `/api/alerts` | Create new alert |
| PATCH | `/api/alerts/:id/resolve` | Mark alert resolved |
| DELETE | `/api/alerts/:id` | Delete alert |
| GET | `/api/alerts/export/csv` | Download alerts as CSV |
| GET | `/api/districts` | Get all districts with risk levels |
| GET | `/api/districts/:id` | Get single district details |
| GET | `/api/districts/:id/history` | Get NDVI + water extent time series |
| GET | `/api/ndvi/latest` | Get latest NDVI readings per district |
| GET | `/api/ndvi/:districtId` | Get NDVI history for chart |
| POST | `/api/ndvi/calculate` | Trigger NDVI recalculation |
| POST | `/api/uploads` | Upload satellite data file |
| GET | `/api/uploads` | List all uploaded files |
| DELETE | `/api/uploads/:id` | Delete uploaded file |
| GET | `/api/pipeline/status` | Get pipeline stage status |
| POST | `/api/pipeline/trigger` | Manually trigger pipeline |
| GET | `/health` | Server health + DB status |

## Project Structure

```
geosentinel/
├── client/                    # React frontend (Vite)
│   ├── src/
│   │   ├── components/        # UI components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Auth context
│   │   └── services/           # API service layer
│   └── package.json
├── server/                    # Express backend
│   ├── config/                # Database config
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── controllers/           # Route handlers
│   ├── middleware/           # Auth, upload, error handling
│   ├── services/             # Business logic
│   ├── utils/                # Seed data script
│   └── package.json
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

## Docker Services

| Service | Port | Description |
|---------|------|-------------|
| client | 5173 (80 in prod) | React frontend |
| server | 5000 | Express API |
| mongodb | 27017 | Local MongoDB (use Atlas in prod) |

## Useful Docker Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f server

# Restart a service
docker-compose restart server

# Rebuild after code changes
docker-compose up -d --build

# Enter container shell
docker-compose exec server sh

# Clean up everything
docker-compose down -v
```

## License

MIT License - See LICENSE file for details.