import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/repositories/permissionRepository.interface';
import { createPermissionDto } from './dtos/create.dto';
import { updatePermissionDto } from './dtos/update.dto';
import { ApiTags } from '@nestjs/swagger';

    @ApiTags('Permissions')
    @Controller('permissions')
    export class PermissionController {
        constructor(
            @Inject('IPermissionRepository')
            private readonly permissionRepo: IPermissionRepository,
        ) {}

    @Get()
    async getallPermissions() {
        return this.permissionRepo.findAll();
    }

 
    @Post('/create')
    async register(@Body() body: createPermissionDto){
        return this.permissionRepo.create(body);
    }


    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updatePermissionDto){
        return this.permissionRepo.update(id,body);
    }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.permissionRepo.delete(id);
    }
}