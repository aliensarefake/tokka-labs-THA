# Tokka Labs THA

## Overview
This project tracks transaction fees in USDT and ETH for all Uniswap WETH-USDC transactions. It supports both real-time data recording and historical batch processing. The application consists of a backend built with Express.js and a frontend built with React.js.

## Project Structure
/backend (Express.js)
/frontend (React.js)

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
  "infuraProjectId": "your_infura_project_id",
  "UNISWAP_POOL_ADDRESS": "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
}
```
4. Start the backend server:
``` node app.js ```

### 2. Frontend Setup
1. Navigate to the frontend repository:
``` cd frontend ```
2. Install the dependencies:
``` npm install ```
3. Start the frontend server:
``` npm start ```


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