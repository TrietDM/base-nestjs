import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../infrastructure/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import { createUserDto } from './dtos/register.dto';
import { loginUserDto } from './dtos/login.dto';
import { updateUserDto } from './dtos/update.dto';


    @Controller('users')
    export class UsersController {
        constructor(
            @Inject('IUserRepository')
            private readonly userRepo: IUserRepository,
        ) {}

    @Get()
    async getallUsers() {
        return this.userRepo.findAll();
    }

    @Get(':id')
    async getUser(@Param('id') id: any){
        return this.userRepo.getById(id);
    }


    
    @Get(':search')
    async search(@Param('search') search: any ){
        return this.userRepo.search(search);
    }

    @Post('/register')
    async register(@Body() body: createUserDto){
        return this.userRepo.register(body);
    }

    @Post()
    async login(@Body() body: loginUserDto){
        return this.userRepo.login(body);
    }

    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updateUserDto){
        return this.userRepo.updateUser(id,body);
    }

    @Put(':id/status')
    async updateStatus(@Param('id') id: number){
        return this.userRepo.updateStatus(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.userRepo.delete(id);
    }
}