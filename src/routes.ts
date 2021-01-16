import { Router } from 'express';

const routes = Router();

routes.get('/test', (request, response) => {
  return response.status(200).json({ message: 'hello world!' });
});

export default routes;
