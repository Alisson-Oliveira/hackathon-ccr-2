import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import Location from './Location';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  name: string;
 
  @Column()
  email: string;

  @Column()
  password: string;
}