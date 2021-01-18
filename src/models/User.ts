import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  area: string;

  @Column()
  points: number;

  @Column()
  course: string;

  @Column()
  age: number;
}