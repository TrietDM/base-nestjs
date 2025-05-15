import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import { createUserDto } from './dtos/register.dto';
import { loginUserDto } from './dtos/login.dto';
import { updateUserDto } from './dtos/update.dto';
import { RegisterUserUseCase } from 'src/usecases/register.usecase';
import { LoginUserUseCase } from 'src/usecases/login.usecase';
import { UserListViewModel } from 'src/domain/model/user.model';


    @Controller('users')
    export class UsersController {
        constructor(
            @Inject('IUserRepository')
            private readonly userRepo: IUserRepository,
            private readonly registerUserUseCase: RegisterUserUseCase,
            private readonly loginUserUseCase: LoginUserUseCase
        ) {}

    @Get()
    async getallUsers() {
        const users = await this.userRepo.findAll();
        return users.map((user) => new UserListViewModel(user)); 
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
        return this.registerUserUseCase.execute(body);
    }

    @Post()
    async login(@Body() body: loginUserDto){
        return this.loginUserUseCase.execute(body);
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