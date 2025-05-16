import { IsString, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsString()
  phone_num: string;

  @ApiProperty()
  @IsInt()
  job_id: number;

  @ApiProperty()
  @IsEmail()
  email?: string;
}
