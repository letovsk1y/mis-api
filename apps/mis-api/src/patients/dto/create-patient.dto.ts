import { Gender } from '../enums';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @Matches(/^\+\d+/, {
    message: "phone must be valid phone format: +123456789..."
  })
  @IsString()
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;
}
