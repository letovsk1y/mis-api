import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  exports: [TypeOrmModule, PatientService],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
