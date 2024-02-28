import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  exports: [TypeOrmModule],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
