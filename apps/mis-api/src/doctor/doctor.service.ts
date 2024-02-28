import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities';
import { CreateDoctorDto } from './dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const entity = this.doctorRepository.create(createDoctorDto);
    if (entity.price < 0) {
      throw new HttpException("price can not be less than 0", HttpStatus.BAD_REQUEST);
    }

    return await this.doctorRepository.save(entity);
  }
}
