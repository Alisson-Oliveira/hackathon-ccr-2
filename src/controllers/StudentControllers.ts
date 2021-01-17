import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
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