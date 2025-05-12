import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createJobDto {
    @IsString()
    name: string;
    @IsString()
    permission: string;
    @IsString()
    industry: string;
    @IsString()
    company: string;
    @IsString()
    unit: string;
    @IsString()
    department: string;
    @IsString()
    function: string;
    @IsString()
    own: string;

    @IsString()
    system: string;

    @IsString()
    description: string;
  }