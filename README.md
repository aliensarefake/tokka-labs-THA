# Tokka Labs THA

## Overview
This project tracks transaction fees in USDT and ETH for all Uniswap WETH-USDC transactions. It supports both real-time data recording and historical batch processing. The application consists of a backend built with Express.js and a frontend built with React.js.

## Project Structure
/backend    # Backend (Express.js)
/frontend   # Frontend (React.js)

## Prerequisites
- Node.js 
- npm
- MongoDB 
- Etherscan API Key

## Installations
### 1. Backend Setup
1. Navigate to the backend repository:
``` cd backend ```
2. Install the dependencies:
``` npm install ```
3. Create a config folder with a default.json file:
```
/backend
├── config
│   └── default.json
├── src
├── package.json
└── ...
```
```
{
  "mongoURI": "your_mongodb_connection_string",
  "etherscanApiKey": "your_etherscan_api_key",
  "infuraProjectId": "your_infura_project_id"
}
```
4. Start the backend server:
``` npm start ```

### 2. Frontend Setup
1. Navigate to the frontend repository:
``` cd frontend ```
2. Install the dependencies:
``` npm install ```


## Running the Application
Backend runs on http://localhost:4100.
Frontend runs on http://localhost:3000.

## Testing
1. Navigate to the backend directory:
``` cd backend ```
2. Run tests:
``` npm test ```

## Link to API endpoints
http://localhost:4100/api-docs/