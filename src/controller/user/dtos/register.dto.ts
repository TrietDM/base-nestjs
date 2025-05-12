import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createUserDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    full_name: string;
    
    @IsString()
    phone_num: string;

    @IsInt()
    job_id: number;

    @IsEmail()
    email?: string;
  }