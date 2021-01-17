import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export default class Course {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  title: string;

  @Column()
  amount: number;
 
  @Column()
  hours: string;

  @Column()
  area: string;

  @Column()
  description: string;

  @Column()
  teacher_id: number;
}