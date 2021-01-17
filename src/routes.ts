import { Router } from 'express';

const routes = Router();

import UsersControllers from './controllers/UsersControllers';
import CoursesControllers from './controllers/CoursesControllers';
import LocalizationControllers from './controllers/LocalizationControllers';

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Open Server' });
});

// Só tava testando isso, mas funciona
routes.post('/login', UsersControllers.show);
routes.post('/register', UsersControllers.create);

// Crud Curso
routes.post('/courses/create', CoursesControllers.create);
routes.get('/courses/search/:search', CoursesControllers.show);
routes.get('/courses/details/:id', CoursesControllers.index);
routes.put('/courses/edit/:id', CoursesControllers.edit);
routes.delete('/courses/delete/:id', CoursesControllers.delete); 

// Crud Localização
routes.get('/localization', LocalizationControllers.show);
routes.post('/localization/create', LocalizationControllers.create);
routes.get('/localization/search/:search', LocalizationControllers.search);
routes.put('/localization/reserv/:id', LocalizationControllers.reserv);
routes.get('/localization/details/:id', LocalizationControllers.index);

export default routes;
