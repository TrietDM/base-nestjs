import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail,  IsOptional,  Length, ValidateNested } from 'class-validator';
import { createFunctionDto } from "src/controller/function/dtos/create.dto";

export class updateSystemDto {
    @IsOptional()
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested({ each: true})
    @Type(() => createFunctionDto)
    functions: createFunctionDto[];
  }