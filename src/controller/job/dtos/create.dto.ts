import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createJobDto {
    @IsString()
    name: string;

    @IsString()
    industry: string;
    @IsString()
    company: string;
    @IsString()
    unit: string;
    @IsString()
    department: string;

    @IsString()
    own: string;

    @IsInt()
    systemId: number;

    @IsString()
    description: string;
  }