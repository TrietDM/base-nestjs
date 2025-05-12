import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { ISystemRepository } from 'src/domain/repositories/systemRepository.interface';
import { createSystemDto } from './dtos/create.dto';
import { updateSystemDto } from './dtos/update.dto';

    @Controller('systems')
    export class SystemController {
        constructor(
            @Inject('ISystemRepository')
            private readonly systemRepo: ISystemRepository,
        ) {}

    @Get()
    async getallSystem() {
        return this.systemRepo.findAll();
    }

 
    @Post('/create')
    async register(@Body() body: createSystemDto){
        return this.systemRepo.create(body);
    }


    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updateSystemDto){
        return this.systemRepo.update(id,body);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.systemRepo.delete(id);
    }
}