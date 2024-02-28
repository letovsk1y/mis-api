import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto';
import { Doctor } from './entities';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("doctor")
@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Post()
  async createPatient(@Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.create(createDoctorDto);
  }
}

