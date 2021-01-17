import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
  /**
   * @param request
   * @param response 
   * @returns todas as informações dos estudantes por aréa de atuação.
   **/
  async area(request: Request, response: Response) {
    try {
      const { area } = request.params;

      const users = await getRepository(User)
        .createQueryBuilder('users')
        .where('users.area like :area', { area: `%${area}%` })
        .getManyAndCount();
  
      if (!users) {
        return response.status(401).send({ error: 'User not found.' }); 
      }
  
      return response.status(201).json(users);
    } catch (error) {
      console.error('Error showing students - ' + error); 

      return response.status(400).json({ message: 'Error showing studens' }); 
    }
  },

  /**
   * @param request
   * @param response 
   * @returns todas as informações dos estudantes por ordem decrescente dos seus pontos.
   **/
  async points(request: Request, response: Response) {
    try {
      const users = await getRepository(User)
        .createQueryBuilder('courses')
        .orderBy("courses.points", "DESC")
        .getMany();
  
      if (!users) {
        return response.status(401).send({ error: 'User not found.' }); 
      }
  
      return response.status(201).json(users);
    } catch (error) {
      console.error('Error showing students - ' + error); 

      return response.status(400).json({ message: 'Error showing studens' }); 
    }
  }
}