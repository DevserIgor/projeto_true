import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';
// import rateLimiter from './middlewares/rateLimiter';

const app = express();

const whitelist = ['http://example1.com', 'http://example2.com'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log(origin);
//     // if (whitelist.indexOf(origin) !== -1) {
//     //   callback(null, true);
//     // } else {
//     //   callback(new Error('Not allowed by CORS'));
//     // }
//   },
// };

// app.use(cors(corsOptions));

app.use(express.json());

// app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

app.listen(3333, () => {
  console.log('Server Up');
});
