import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { getType } from '../utils/utils';

export default { 
  async name(request: Request, response: Response)  {
    const { id } = request.params;

    const typeRepository = getType('teacher');

    if (!typeRepository) {
      return response.status(401).send({ error: 'Type not found.' }); 
    }

    const usersRepository = getRepository(typeRepository);

    const user = await usersRepository.findOne({ 
      where: { _id: id }
    });

    return response.status(201).json(user?.name);  
  },

  async show(request: Request, response: Response)  {
    const { email, password, type } = request.body;

    const typeRepository = getType(type);

    if (!typeRepository) {
      return response.status(401).send({ error: 'Type not found.' }); 
    }

    const usersRepository = getRepository(typeRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) { 
      return response.status(401).send({ error: 'User not found.' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(401).send({ error: 'Invalid password.' });
    }

    return response.status(201).json(user);  
  },
    
  async create(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        type
      } = request.body;
  
      const password = await bcrypt.hash(request.body.password, 10);

      const typeRepository = getType(type);

      if (!typeRepository) {
        return response.status(401).send({ error: 'Type not found.' }); 
      }

      const usersRepository = getRepository(typeRepository);
  
      const data = {
        name,
        email,
        password,
      }
  
      const user = usersRepository.create(data);
  
      await usersRepository.save(user);
         
      return response.status(201).json(user);      
    } catch (error) {
      console.error('Error creating user - ' + error); 

      return response.status(401).json({ message: 'Error creating user' });      
    }
  },
}