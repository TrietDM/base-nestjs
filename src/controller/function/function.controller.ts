import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { IFunctionRepository } from 'src/domain/repositories/functionRepository.interface';
import { createFunctionDto } from './dtos/create.dto';
import { updateFunctionDto } from './dtos/update.dto';
import { ApiTags } from '@nestjs/swagger';

    @ApiTags('Functions')
    @Controller('functions')
    export class FunctionController {
        constructor(
            @Inject('IFunctionRepository')
            private readonly functionRepo: IFunctionRepository,
        ) {}

    @Get()
    async getallFunction() {
        return this.functionRepo.findAll();
    }

 
    @Post('/create')
    async register(@Body() body: createFunctionDto){
        return this.functionRepo.create(body);
    }


    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updateFunctionDto){
        return this.functionRepo.update(id,body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.functionRepo.delete(id);
    }
}