import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import dotenv from 'dotenv';
import { env } from './utils/env.js';

import ContactCollection from './db/models/contact.js';

// dotenv.config();
const port = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.get('/contacts', async (req, res) => {
    // res.json({ message: 'start project' });
    const data = await ContactCollection.find();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
