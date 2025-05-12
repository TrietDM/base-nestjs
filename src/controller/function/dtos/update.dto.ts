import { Type } from 'class-transformer';
import { IsString, IsEmail,  IsOptional,  Length, ValidateNested } from 'class-validator';
import { createPermissionDto } from "src/controller/permission/dtos/create.dto";

export class updateFunctionDto {
    @IsOptional()
    @IsString()
    name: string;

    
    @ValidateNested({ each: true})
    @Type(() => createPermissionDto)
    permissions: createPermissionDto[];
  }