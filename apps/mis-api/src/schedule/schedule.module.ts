import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities';
import { PatientModule } from '../patients/patient.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule]), PatientModule],
  exports: [TypeOrmModule],
  providers: [ScheduleService],
  controllers: [ScheduleController]
})
export class ScheduleModule {}
