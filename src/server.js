import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export const setupServer = () => {
  express().use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
};
