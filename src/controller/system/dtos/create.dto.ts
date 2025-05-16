import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, Length, IsInt, ValidateNested } from 'class-validator';
import { createFunctionDto } from 'src/controller/function/dtos/create.dto';
export class createSystemDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @ValidateNested({ each: true})
    @Type(() => createFunctionDto)
    functions: createFunctionDto[];

  }