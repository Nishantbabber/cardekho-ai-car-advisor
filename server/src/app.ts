import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://cardekho-ai-car-advisor.vercel.app',
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman, curl, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export default app;