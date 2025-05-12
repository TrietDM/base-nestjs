import { IsString, IsEmail,  IsOptional,  IsInt } from 'class-validator';
export class updateUserDto {
  
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  phone_num: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  job_id: number;
  }