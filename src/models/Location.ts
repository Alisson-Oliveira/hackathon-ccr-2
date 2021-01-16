import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export default class Location {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  institution: string;
 
  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  hours: string;

  @Column()
  reservation_location: string;
}