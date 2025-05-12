import { IsString, IsEmail,  IsOptional,  Length } from 'class-validator';
export class updatePermissionDto {
    @IsString()
    name: string;

  }