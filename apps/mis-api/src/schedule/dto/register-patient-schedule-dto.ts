import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VisitType } from '../enums/visit-type';

export class RegisterPatientScheduleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  doctorId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  scheduleId: number;

  @IsEnum(VisitType)
  @ApiProperty({ enum: VisitType })
  type: VisitType;
}
