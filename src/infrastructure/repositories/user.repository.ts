import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';

import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../entities/user.entity';
import { createUserDto } from 'src/controller/user/dtos/register.dto';
import { loginUserDto } from 'src/controller/user/dtos/login.dto';
import { updateUserDto } from 'src/controller/user/dtos/update.dto';
import { JobEntity } from '../entities/job.entity';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<UserEntity[]>{
    return await this.userRepo.find();
  }

  async getById(id: number): Promise<UserEntity>{
    return await this.userRepo.findOne({
      where :{id: id}    
    });
  }

  async login(dto: loginUserDto): Promise<any> {
    try{
      const user = await this.userRepo.findOne({where: {username: dto.username}});

    if(!user)
      return { message: 'Wrong password'};
    const hashed = await bcrypt.compare(dto.password,user.password);
    if(!hashed)
      return { message: 'Wrong password'};
    const token = this.generateToken(user.code, user.password);
    return {'token': token};
    }
    catch(err){
      console.error('Error creating user:', err);
    }
  }


  async register(dto: createUserDto): Promise<any>{
    try{
      const existingUser = await this.userRepo.findOne({where: {username: dto.username}});
      const code = await this.generateUniqueCode();
      const job = await this.jobRepo.findOne({
        where: { id: dto.job_id }
      });
      job.using_num++;
      await this.jobRepo.save(job);

      if(existingUser)
        return { message: 'Choose another username'};
      const hashPassword = await bcrypt.hash(dto.password,10);
      const newuser = this.userRepo.create({
        ...dto,
        password: hashPassword,
        code,
      });
      
      return await this.userRepo.save(newuser);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }


  async search(search: string): Promise<any>{
    return this.userRepo.find({
      where : [
        { username: ILike(`%${search}%`) },
        { email: ILike(`%${search}%`) },
        { full_name: ILike(`%${search}%`) },
        { code: ILike(`%${search}%`) },
      ]
    });
  }


  async updateUser(id: number,dto: updateUserDto): Promise<UserEntity>{
    const user = await this.userRepo.findOne({
      where :{id: id}
    });
    const newjob = await this.jobRepo.findOne({
      where: { id: dto.job_id }
    });
    if(dto.job_id){
      if(user.job){
        const oldjob = await this.jobRepo.findOne({
          where: { id: user.job.id}
        })
        oldjob.using_num--;
        await this.jobRepo.save(oldjob);
      }
      newjob.using_num++;
      await this.jobRepo.save(newjob);

    }
      
    
    const updatedUser = { ...user, ...dto };
    return await this.userRepo.save(updatedUser);
  }

  async updateStatus(id: number): Promise<UserEntity>{
    const user = await this.userRepo.findOne({
      where :{id: id}
    });
    user.is_active = !user.is_active;
    return await this.userRepo.save(user);
  }

  async delete(id: number): Promise<any> {
    const user = await this.userRepo.findOne({
      where :{id: id}
    });
    return await this.userRepo.delete(user);
  }





  private async generateUniqueCode(): Promise<string> {
    const prefix = 'AC-';
    
    // Tìm bản ghi có code lớn nhất
    const lastUser = await this.userRepo
      .createQueryBuilder('user')
      .orderBy('user.code', 'DESC')
      .where("user.code LIKE :prefix", { prefix: `${prefix}%` })
      .getOne();
  
    let nextNumber = 1;
  
    if (lastUser?.code) {
      const lastNumber = parseInt(lastUser.code.replace(prefix, ''), 10);
      nextNumber = lastNumber + 1;
    }
  
    // Format: AC-000001
    const nextCode = `${prefix}${String(nextNumber).padStart(6, '0')}`;
    return nextCode;
  }

  private generateToken(userId: string, username: string): string {
    const payload = { userId, username };
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const options = { expiresIn: '1h' }; // Thời gian hết hạn của token

    return jwt.sign(payload, secret, options);
  }
  

}
