#!/bin/bash
set -e

# Ensure Node.js, npm and TypeScript are available
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Please install Node.js." >&2
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required. Please install npm." >&2
  exit 1
fi
if ! command -v tsc >/dev/null 2>&1; then
  echo "Installing TypeScript globally..."
  npm install -g typescript
fi

# Install and build server
echo "Installing server dependencies..."
(cd server && npm install && npm run build)

# Install and build client
echo "Installing client dependencies..."
(cd client && npm install && npm run build)

# Start server and client
echo "Starting server on port 9991..."
(node server/dist/server.js &)
SERVER_PID=$!

echo "Starting client on port 9992..."
(npx http-server client/dist -p 9992 &)
CLIENT_PID=$!

trap 'kill $SERVER_PID $CLIENT_PID' INT TERM
wait $SERVER_PID $CLIENT_PID

