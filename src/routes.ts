import { Router } from 'express';

const routes = Router();

import UsersControllers from './controllers/UsersControllers';
import CoursesControllers from './controllers/CoursesControllers';
import LocalizationControllers from './controllers/LocalizationControllers';
import ReservesControllers from './controllers/ReservesControllers';

routes.get('/', (request, response) => {
  return response.status(200).json({ message: 'Open Server' });
});

// SignIn & SignUp
routes.post('/login', UsersControllers.show);
routes.post('/register', UsersControllers.create);

// Professor
routes.get('/teachers/name/:id', UsersControllers.name);

// Crud Curso
routes.post('/courses/create', CoursesControllers.create);
routes.get('/courses/search/:search', CoursesControllers.show);
routes.get('/courses/area/:area', CoursesControllers.area);
routes.get('/courses/details/:id', CoursesControllers.index);
routes.put('/courses/edit/:id', CoursesControllers.edit);
routes.delete('/courses/delete/:id', CoursesControllers.delete); 

// Crud Localização
routes.get('/localization', LocalizationControllers.show);
routes.post('/localization/create', LocalizationControllers.create);
routes.get('/localization/search/:search', LocalizationControllers.search);
routes.put('/localization/reserv/:id', LocalizationControllers.reserv);
routes.get('/localization/details/:id', LocalizationControllers.index);

// Crud Reserves
routes.post('/reserves/create', ReservesControllers.create);
routes.get('/reserves', ReservesControllers.show);
routes.get('/reserves/details/:id', ReservesControllers.index);
routes.delete('/reserves/delete/:id', ReservesControllers.delete); 

export default routes;
