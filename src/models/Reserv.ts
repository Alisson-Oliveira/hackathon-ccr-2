import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reserves')
export default class User {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  localization_id: number;
 
  @Column()
  user_id: number;
}