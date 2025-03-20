# Adel Alaali's Interactive Resume Terminal

A web applet showcasing Adel Alaali's resume via a hacker-style terminal, with a backend server to log visitor IP addresses using SQLite.

## Project Structure

- **client/**: Frontend web applet
  - `src/index.html`: HTML structure
  - `src/styles.css`: Styling
  - `src/app.ts`: TypeScript logic
- **server/**: Backend server
  - `src/server.ts`: Express.js server
  - `src/database.ts`: SQLite database operations
  - `src/types.ts`: TypeScript types

## Setup Instructions

### Prerequisites
- Node.js and npm
- TypeScript (`npm install -g typescript`)

### Client Setup
1. Navigate to `client/`:
   ```bash
   cd client
   npm install
   npm run build
   npm start