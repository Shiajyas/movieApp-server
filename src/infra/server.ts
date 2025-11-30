import 'reflect-metadata';
import mongoose from 'mongoose';
import { PORT, MONGO_URI } from '../config/env';
import app from './http/app';
import './container';

async function start() {
  // await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
