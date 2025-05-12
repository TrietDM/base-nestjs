import { loginUserDto } from "src/controller/user/dtos/login.dto";
import { createUserDto } from "src/controller/user/dtos/register.dto";
import { updateUserDto } from "src/controller/user/dtos/update.dto";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export interface IUserRepository {
  login(dto: loginUserDto): Promise<any>;
  findAll(): Promise<UserEntity[]>;
  getById(id: number): Promise<UserEntity>;
  register(dto: createUserDto): Promise<any>;
  updateUser(id: number, dto: updateUserDto): Promise<UserEntity>;
  updateStatus(id: number): Promise<UserEntity>;
  search(search: any): Promise<any>;
  delete(id: number): Promise<any>;
}
