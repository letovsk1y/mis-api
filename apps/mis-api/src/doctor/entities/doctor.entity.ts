import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  spec: string;

  @Column()
  price: number;
}
