import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('localizations')
export default class Localization {
  @PrimaryGeneratedColumn('increment')
  _id: number;

  @Column()
  institution: string;
 
  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  schadule: string;

  @Column()
  reservation_location: string;

  @Column()
  available: boolean;
}