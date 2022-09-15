import express from 'express';
import Routes from './routes/routes';
import errorHandler from './middlewares/ErrorHandler';

require('express-async-errors');

const app = express();
app.use(express.json());
app.use(Routes);
app.use(errorHandler);

export default app;
