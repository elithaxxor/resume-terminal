#!/bin/bash

set -e

# Check for Node.js and npm
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Please install Node.js and rerun this script."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed. Please install npm and rerun this script."
  exit 1
fi

# Install global TypeScript if not present
if ! command -v tsc >/dev/null 2>&1; then
  echo "Installing global TypeScript..."
  npm install -g typescript
fi

# Install and build server
echo "Setting up server..."
cd server
npm install
npm run build &
SERVER_BUILD_PID=$!
cd ..

# Install and build client
echo "Setting up client..."
cd client
npm install
npm run build &
CLIENT_BUILD_PID=$!
cd ..

wait $SERVER_BUILD_PID $CLIENT_BUILD_PID

# Start server in background
echo "Starting server..."
cd server
npm start &
SERVER_PID=$!
cd ..

# Start client in background
echo "Starting client..."
cd client
npm start &
CLIENT_PID=$!
cd ..

echo "-------------------------------------------------"
echo "Setup complete."
echo "Server running at http://localhost:3000"
echo "Client running at http://localhost:8080"
echo "-------------------------------------------------"
echo "Press Ctrl+C to stop both server and client."
wait $SERVER_PID $CLIENT_PID
