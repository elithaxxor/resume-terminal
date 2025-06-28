import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { Parser } from 'json2csv';
import { Configuration, OpenAIApi } from 'openai';
import db from './database';

const app = express();
const port = 9991;
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

app.use(cors({
  origin: 'http://localhost:9992',
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post('/log', async (_req, res) => {
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

app.get('/logs', async (_req, res) => {
  try {
    const logs = await db.getLogs();
    res.json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).send('Error retrieving logs');
  }
});

app.get('/export', async (req, res) => {
  const format = (req.query.format as string) || 'json';
  const logs = await db.getLogs();
  if (format === 'csv') {
    const parser = new Parser();
    const csv = parser.parse(logs);
    res.header('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    res.json(logs);
  }
});

app.post('/chat', async (req, res) => {
  try {
    const message = req.body.message;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: message }]
    });
    res.json({ reply: completion.data.choices[0].message?.content });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
