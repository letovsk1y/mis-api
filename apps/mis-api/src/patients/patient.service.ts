import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from './entities';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreatePatientDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    private dataSource: DataSource,
  ) {}

  // async getById(id: string, manager?: EntityManager): Promise<Patient> {
  //   const repository = manager ? manager.getRepository(Patient) : this.patientRepository;
  //   const patient = await repository.findOne({ where: { id } });
  //   if (!patient) {
  //     throw new HttpException("patient not found", HttpStatus.BAD_REQUEST);
  //   }
  //
  //   return patient;
  // }

  async exists(id: string, manager?: EntityManager): Promise<boolean> {
    const repository = manager ? manager.getRepository(Patient) : this.patientRepository;
    return repository.existsBy({ id })
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    let createdPatient: Patient;
    await this.dataSource.transaction(async manager => {
      const patientRepository = manager.getRepository(Patient);
      const patient = await patientRepository.findOne({ where: [{ email: createPatientDto.email }, { phone: createPatientDto.phone }] });
      if (patient) {
        throw new HttpException('email and phone must be unique', HttpStatus.BAD_REQUEST)
      }
      const entity = patientRepository.create(createPatientDto);
      createdPatient = await manager.save(entity);
    });

    return createdPatient;
  }

}
