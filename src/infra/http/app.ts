import express from 'express';
import cors from 'cors';
import "reflect-metadata";


import movieRoutes from '../../presentation/routes/movies.routes';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/movies', movieRoutes);

export default app;
