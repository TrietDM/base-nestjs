import { IsString, IsEmail,  IsOptional,  Length } from 'class-validator';
export class updateJobDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    permission: string;
    
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
    function: string;
    
    @IsOptional()
    @IsString()
    own: string;
    
    @IsOptional()
    @IsString()
    system: string;

    @IsOptional()
    @IsString()
    description: string;
  }