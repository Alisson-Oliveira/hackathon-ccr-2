import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../models/User';

export default { 
  async show(request: Request, response: Response)  {
    const { email, password } = request.body;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) 
      return response.status(401).send({ error: 'User not found.' });

    if (!await bcrypt.compare(password, user.password))
      return response.status(401).send({ error: 'Invalid password.' });

    return response.status(201).json(user);  
  },
    
  async create(request: Request, response: Response) {
    try {
      const {
        name,
        email,
      } = request.body;
  
      const password = await bcrypt.hash(request.body.password, 10);

      const usersRepository = getRepository(User);
  
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