import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Reserv from '../models/Reserv';
import User from '../models/User';

export default { 
  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const reserves = await getRepository(Reserv)
        .createQueryBuilder('reserves')
        .where('reserves.user_id = :id', { id: id })
        .getMany();

      return response.status(200).json(reserves);
    } catch (error) {
      console.error('Error showing reserves - ' + error); 

      return response.status(400).json({ message: 'Error showing reserves' });      
    }
  },

  async show(request: Request, response: Response) {
    try {
      const reserves = await getRepository(Reserv)
        .createQueryBuilder('reserves')
        .getMany();

      return response.status(200).json(reserves);
    } catch (error) {
      console.error('Error showing reserves - ' + error); 

      return response.status(400).json({ message: 'Error showing reserves' });      
    }
  },

  async create(request: Request, response: Response) {
    try {
      const {
        localization_id,
        user_id
      } = request.body;
  
      const resevRepository = getRepository(Reserv);

      const user = await getRepository(User).findOne({ 
        where: { _id: user_id }
      });
  
      if (!user) {
        return response.status(401).json({ message: 'User Not Found' });
      }

      const data = {
        localization_id,
        user_id: user._id
      }
  
      const reserv = resevRepository.create(data);
  
      await resevRepository.save(reserv);
         
      return response.status(201).json(reserv);      
    } catch (error) {
      console.error('Error creating reserv - ' + error); 

      return response.status(401).json({ message: 'Error creating reserv' });      
    }
  },

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await getRepository(Reserv).delete(id);
       
      return response.status(201).json({ message: 'Reserva deletado' });
    } catch (error) {
      console.error('Error deleting reserv - ' + error); 

      return response.status(401).json({ message: 'Error deleting reserv' });   
    }
  }
}