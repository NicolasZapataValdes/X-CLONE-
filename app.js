import express from 'express';
import { router, postRouter } from './Routes/index.js';

export const app = express();

app.use(express.json());

app.use('/api/v1', postRouter);
app.use('/api/v1', router);
