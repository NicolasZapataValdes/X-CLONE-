import express from 'express';
import { router } from './Routes/index.js';

export const app = express();

import { postRouter } from './Controllers/index.js';

app.use(express.json());

app.use('/api/v1', postRouter);
app.use('/api/v1', router);
