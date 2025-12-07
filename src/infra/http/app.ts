import express from 'express';
import cors from 'cors';
import "reflect-metadata";

import authRoutes from './auth.routes';
import movieRoutes from './movies.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

export default app;
