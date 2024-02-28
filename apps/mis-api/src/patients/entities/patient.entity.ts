import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../enums';

@Entity("patients")
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;
}
