import { IsString, IsEmail,  IsOptional,  Length, IsInt } from 'class-validator';
export class updateJobDto {
    @IsOptional()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsString()
    industry: string;
    
    @IsOptional()
    @IsString()
    company: string;
    
    @IsOptional()
    @IsString()
    unit: string;
    
    @IsOptional()
    @IsString()
    department: string;
  
    
    @IsOptional()
    @IsString()
    own: string;
    
    @IsOptional()
    @IsInt()
    systemId: number;

    @IsOptional()
    @IsString()
    description: string;
  }