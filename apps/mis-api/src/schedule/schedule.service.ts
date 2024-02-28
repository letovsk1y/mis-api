import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Schedule } from './entities';
import { RegisterPatientScheduleDto } from './dto/register-patient-schedule-dto';
import { DateTime } from 'luxon';
import { PatientService } from '../patients/patient.service';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private dataSource: DataSource,
    private patientService: PatientService,
  ) {}
  async registerPatientSchedule(registerPatientScheduleDto: RegisterPatientScheduleDto): Promise<void> {
    await this.dataSource.transaction(async manager => {
      const scheduleRepository = this.dataSource.getRepository(Schedule);
      const schedule = await scheduleRepository.findOne({ where: {
          id: registerPatientScheduleDto.scheduleId,
          doctor: { id: registerPatientScheduleDto.doctorId },
        }
      })

      if (!await this.patientService.exists(registerPatientScheduleDto.patientId, manager)) {
        throw new HttpException("patient not found", HttpStatus.BAD_REQUEST);
      }

      if (!schedule) {
        throw new HttpException("schedule with provided credentials not found", HttpStatus.BAD_REQUEST);
      }

      if (!schedule.isFree) {
        throw new HttpException("schedule already taken", HttpStatus.BAD_REQUEST);
      }

      if (DateTime.fromJSDate(schedule.timeTo) <= DateTime.now()) {
        throw new HttpException("schedule time expired", HttpStatus.BAD_REQUEST);
      }

      return scheduleRepository.update({ id: registerPatientScheduleDto.scheduleId }, {
        isFree: false,
        patient: { id: registerPatientScheduleDto.patientId },
      })
    })
  }
}
