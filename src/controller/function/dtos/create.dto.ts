import { Type } from 'class-transformer';
import { IsString, IsEmail, Length, IsInt, ValidateNested } from 'class-validator';
import { createPermissionDto } from 'src/controller/permission/dtos/create.dto';
export class createFunctionDto {
    @IsString()
    name: string;

    @ValidateNested({ each: true})
    @Type(() => createPermissionDto)
    permissions: createPermissionDto[];

  }