import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctor/entities';
import { Patient } from '../../patients/entities';
import { VisitType } from '../enums/visit-type';

@Entity("schedule")
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Doctor)
  doctor: Doctor

  @Column("date")
  date: string;

  @Column("timestamp")
  timeFrom: Date;

  @Column("timestamp")
  timeTo: Date;

  @Column({ default: true })
  isFree: boolean

  @ManyToOne(() => Patient, { nullable: true })
  patient?: Patient;

  @Column('enum', { enum: VisitType, nullable: true })
  type?: Patient;
}
