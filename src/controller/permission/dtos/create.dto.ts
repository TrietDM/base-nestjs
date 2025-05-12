import { IsString, IsEmail, Length, IsInt } from 'class-validator';
export class createPermissionDto {
    @IsString()
    name: string;

    
  }