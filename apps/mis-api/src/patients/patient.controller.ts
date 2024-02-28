import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreatePatientDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { Patient } from './entities';

@ApiTags("patient")
@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  async createPatient(@Body(new ValidationPipe()) createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientService.create(createPatientDto);
  }
}
