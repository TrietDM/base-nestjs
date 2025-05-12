/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/domain/dtos/pagination.dto';

export class FindAllChooseEventDto extends PaginationDto {
  //   @ApiPropertyOptional({ description: '1: Được chọn, 2: Từ chối' })
  //   @IsOptional({ message: 'TYPE_IS_NOT_EMPTY' })
  //   //@ArrayMaxSize(2)
  //   readonly type: number[];
}
