import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Localization from '../models/Localization';

export default {
  async index(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const location = await getRepository(Localization).findOne({
        where: { _id: id }
      });

      return response.status(200).json(location);
    } catch (error) {
      console.error('Error showing localization - ' + error); 

      return response.status(400).json({ message: 'Error showing localization' });      
    }
  },
  
  async show(request: Request, response: Response) {
    try {
      const localization = await getRepository(Localization)
        .createQueryBuilder('localizations')
        .getMany();

      return response.status(200).json(localization);
    } catch (error) {
      console.error('Error showing localization - ' + error); 

      return response.status(400).json({ message: 'Error showing localization' });      
    }
  },
  
  async create(request: Request, response: Response) {
    try {
      const {
        institution,
        latitude,
        longitude,
        schadule,
        reservation_location,
      } = request.body;

      const localizationsRepository = getRepository(Localization);

      const data = {
        institution,
        latitude,
        longitude,
        schadule,
        reservation_location,
        available: true,
      }

      await localizationsRepository.save(data);
         
      return response.status(201).json(data);      
    } catch (error) {
      console.error('Error creating localization - ' + error); 

      return response.status(401).json({ message: 'Error creating localization' });
    }
  },

  async search(request: Request, response: Response) {
    try {
      const { search } = request.params;

      const localizations = await getRepository(Localization)
        .createQueryBuilder('localizations')
        .select('localizations.institution')
        .where('localizations.institution like :search', { search: `%${search}%` })
        .getManyAndCount();
      
      return response.status(201).json(localizations);
    } catch (error) {
      console.error('Error searching localization - ' + error); 

      return response.status(401).json({ message: 'Error searching localization' });      
    }
  },

  async reserv(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { available } = request.body;

      const localizationsRepository = getRepository(Localization);

      const localization = await localizationsRepository.findOne({
        where: { _id: id }
      });
      
      const data = { ...localization, available };

      await localizationsRepository.save({ ...localization, ...data });

      return response.status(201).json({ 
        message: !available ? 'Local Reservado' : 'Local Diponível'
      });
    } catch (error) {
      console.error('Error reserving localization - ' + error); 

      return response.status(401).json({ message: 'Error reserving localization' });      
    }
  }
}