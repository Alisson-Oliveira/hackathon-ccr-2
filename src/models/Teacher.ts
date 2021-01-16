import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('teachers')
export default class Teacher {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}