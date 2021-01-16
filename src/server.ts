import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);
