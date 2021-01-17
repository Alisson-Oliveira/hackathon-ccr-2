import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Course from '../models/Course';
import Teacher from '../models/Teacher';

export default {   
  /**
   * @param request
   * @param response 
   * @returns Um curso com todas as informações. 
   **/
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

  /**
   * @param request
   * @param response 
   * @returns Um curso com as informações titulo, carga horária, Aréa de atuaçãoe id do professor. 
   **/
  async show(request: Request, response: Response) {
    try {
      const { search } = request.params;

      const courses = await getRepository(Course)
        .createQueryBuilder('courses')
        .select([
          'courses.title', 
          'courses.hours', 
          'courses.area',
          'courses.teacher_id'
        ]) 
        .where('courses.title like :search', { search: `%${search}%` })
        .getManyAndCount();

      return response.status(201).json(courses);
    } catch (error) {
      console.error('Error showing course - ' + error); 

      return response.status(401).json({ message: 'Error showing course' });    
    }
  },
  
  /**
   * @param request
   * @param response 
   * @returns Todos os curso por aréa de atuação. 
   **/
  async area(request: Request, response: Response) {
    try {
      const { area } = request.params;

      const courses = await getRepository(Course)
        .createQueryBuilder('courses')
        .where('courses.area like :area', { area })
        .getManyAndCount();

      return response.status(200).json(courses);
    } catch (error) {
      console.error('Error showing courses - ' + error); 

      return response.status(400).json({ message: 'Error showing courses' });      
    }
  },

  /**
   * @param request
   * @param response 
   * @returns Um curso com todas as informações.
   **/
  async create(request: Request, response: Response) {
    try {
      const {
        title,
        amount,
        hours,
        area,
        description,
        teacher_id,
      } = request.body;

      const coursesRepository = getRepository(Course)

      const teacher = await getRepository(Teacher).findOne({
        where: { _id: teacher_id }
      });

      if (!teacher) {
        return response.status(401).json({ message: 'Teacher Not Found' });
      }

      const data = {
        title,
        amount,
        hours,
        area,
        description,
        teacher_id: teacher._id,
      }
  
      const course = coursesRepository.create(data);
  
      await coursesRepository.save(course);
         
      return response.status(201).json(course);      
    } catch (error) {
      console.error('Error creating course - ' + error); 

      return response.status(401).json({ message: 'Error creating course' });      
    }
  },

  /**
   * @param request
   * @param response 
   * @returns Uma menssagem de delete.
   **/
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

  /**
   * @param request
   * @param response 
   * @returns Uma menssagem de edição e o as informações do curso editado.
   **/
  async edit(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const {
        title,
        amount,
        hours,
        area,
        description,
        teacher_id,
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
        teacher_id,
      };

      await courseRepository.save({ ...course, ...data });

      return response.status(201).json({ message: 'Curso Editado', data });
    } catch (error) {
      console.error('Error editing course - ' + error);

      return response.status(401).json('Error editing course');
    }
  }
}