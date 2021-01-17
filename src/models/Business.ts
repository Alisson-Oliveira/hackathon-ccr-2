import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('businesses')
export default class Business {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}