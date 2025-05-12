import { Type } from 'class-transformer';
import { IsString, IsEmail, Length, IsInt, ValidateNested } from 'class-validator';
import { createFunctionDto } from 'src/controller/function/dtos/create.dto';
export class createSystemDto {
    @IsString()
    name: string;

    @ValidateNested({ each: true})
    @Type(() => createFunctionDto)
    functions: createFunctionDto[];

  }