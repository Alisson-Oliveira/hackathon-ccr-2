import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Course from '../models/Course';

export default {   
  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const course = await getRepository(Course).findOne({
        where: { _id: id }
      });

      if (!course) {
        return response.status(201).json([]); 
      }
      
      return response.status(201).json(course);
    } catch (error) {
      console.error('Error showing course - ' + error); 

      return response.status(401).json({ message: 'Error showing course' });    
    }
  },

  async show(request: Request, response: Response) {
    try {
      const { search } = request.params;

      const courses = await getRepository(Course)
        .createQueryBuilder('courses')
        .select('courses.title')
        .where('courses.title like :search', { search: `%${search}%` })
        .getManyAndCount();
      
      return response.status(201).json(courses);
    } catch (error) {
      console.error('Error showing course - ' + error); 

      return response.status(401).json({ message: 'Error showing course' });    
    }
  },

  async create(request: Request, response: Response) {
    try {
      const {
        title,
        amount,
        hours,
        area,
        description,
      } = request.body;

      const coursesRepository = getRepository(Course)

      const data = {
        title,
        amount,
        hours,
        area,
        description,
      }
  
      const course = coursesRepository.create(data);
  
      await coursesRepository.save(course);
         
      return response.status(201).json(course);      
    } catch (error) {
      console.error('Error creating course - ' + error); 

      return response.status(401).json({ message: 'Error creating course' });      
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await getRepository(Course).delete(id);
       
      return response.status(201).json({ message: 'Curso deletado' });
    } catch (error) {
      console.error('Error deleting course - ' + error); 

      return response.status(401).json({ message: 'Error deleting course' });   
    }
  },

  async edit(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const {
        title,
        amount,
        hours,
        area,
        description,
      } = request.body;

      const courseRepository = getRepository(Course);

      const course = await courseRepository.findOne({
        where: { _id: id }
      });
      
      const data = {
        ...course,
        title,
        amount,
        hours,
        area,
        description,
      };

      await courseRepository.save({ ...course, ...data });

      return response.status(201).json({ message: 'Curso Editado', data });
    } catch (error) {
      console.error('Error editing course - ' + error);

      return response.status(401).json('Error editing course');
    }
  }
}