import express from 'express';
import cors from 'cors';
import axios from 'axios';
import db from './database';

const app = express();
const port = 3000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:8080', // Allow requests from the client
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Endpoint to log visitor data
app.post('/log', async (req, res) => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    const visitorIp = response.data.ip;
    await db.logVisitor(visitorIp);
    res.send('Visitor data logged successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error logging visitor data');
  }
});

// Optional: Endpoint to retrieve logs (for debugging)
app.get('/logs', async (req, res) => {
  try {
    const logs = await db.getLogs();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Error retrieving logs');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});