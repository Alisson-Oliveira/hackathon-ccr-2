import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import cors from 'cors';

import 'reflect-metadata';
import './database';

const app = express();

dotenv.config();

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
