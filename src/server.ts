import express from 'express';
import cookieParser from 'cookie-parser';
import router from '@src/router/index.js';
import cors from 'cors';
import qs from 'qs';
import { NextFunction, Request, Response } from "express";

const app = express();

app.enable('trust proxy');
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Content-Disposition', 'Content-Length'],
  }),
);
app.set('query parser', (str: string) =>
  qs.parse(str, {
    arrayLimit: 100,
    comma: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.use(function(error: { code: number; error: unknown }, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = error?.code || 500;

  res.status(statusCode).send(error);
});

const port = process.env.PORT;

if (!port) throw new Error('server port not defined in .env');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
