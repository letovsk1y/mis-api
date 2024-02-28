import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterPatientScheduleDto } from './dto/register-patient-schedule-dto';
import { ScheduleService } from './schedule.service';

@ApiTags("schedule")
@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  // @Get()
  // async getSchedule(): Promise<Schedule[]> {
  //   return 'Schedule';
  // }

  @Post("register-patient")
  async registerPatientSchedule(@Body(new ValidationPipe()) registerPatientScheduleDto: RegisterPatientScheduleDto) {
    await this.scheduleService.registerPatientSchedule(registerPatientScheduleDto)
  }
}
