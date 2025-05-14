import { loginUserDto } from "src/controller/user/dtos/login.dto";
import { createUserDto } from "src/controller/user/dtos/register.dto";
import { updateUserDto } from "src/controller/user/dtos/update.dto";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  getById(id: number): Promise<UserEntity>;
  updateUser(id: number, dto: updateUserDto): Promise<UserEntity>;
  updateStatus(id: number): Promise<UserEntity>;
  search(search: string): Promise<any>;
  delete(id: number): Promise<any>;
  saveUser(data: Partial<UserEntity>): Promise<UserEntity>
  findLastUserByCode(prefix: string): Promise<UserEntity | null>
  searchUser(username: string): Promise<any>
}
