import { Router } from 'express';

const routes = Router();

import UsersControllers from './controllers/UsersControllers';
import CoursesControllers from './controllers/CoursesControllers';

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Open Server' });
});

routes.post('/login', UsersControllers.show);
routes.post('/register', UsersControllers.create);

routes.post('/courses/create', CoursesControllers.create);
routes.get('/courses/search/:search', CoursesControllers.show);
routes.get('/courses/details/:id', CoursesControllers.index);
routes.put('/courses/edit/:id', CoursesControllers.edit);
routes.delete('/courses/delete/:id', CoursesControllers.delete); 

export default routes;
