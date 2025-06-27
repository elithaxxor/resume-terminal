# Adel Alaali's Interactive Resume Terminal

This project showcases Adel Alaali's resume through a terminal inspired web interface. A small Express/SQLite server logs visitor IP addresses.

## Project Structure

- **client/** – front‑end TypeScript application
- **server/** – back‑end Express server and SQLite database
- **autorun.sh** – helper script to install dependencies, build and start both apps

## Requirements

- Node.js and npm
- TypeScript installed globally (`npm install -g typescript`)
- `http-server` to serve the client (installed locally with `npm install` or globally via `npm install -g http-server`)

## Installation

1. Clone the repository and move into the project directory.
2. Install dependencies for both applications:
   ```bash
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```
3. Run the provided `autorun.sh` script:
   ```bash
   ./autorun.sh
   ```
The script installs packages if needed, builds the TypeScript sources, then starts the server and client.

The server listens on **port 9991** and the client is served on **port 9992**.

## Manual Steps

If you prefer to run the steps manually:

```bash
# Build and start the server
cd server
npm install
npm run build
node dist/server.js
```

In a separate terminal:

```bash
# Build and start the client
cd client
npm install
npm run build
PORT=9992 npm start
```

## Proposal for Future Features

See [PROPOSAL.md](PROPOSAL.md) for a list of ideas to extend the application.
