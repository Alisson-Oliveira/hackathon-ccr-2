import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import cors from 'cors';

import 'reflect-metadata';
import './database';

const app = express();

dotenv.config();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "");
//   next();
// });

app.use(cors({
  origin: "*",
  methods: "GET, PUT, POST, DELETE"
}));

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
