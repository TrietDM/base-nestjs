import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';
import { IUserRepository } from 'src/domain/repositories/userRepository.interface';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { UserEntity } from '../entities/user.entity';
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
      user.job = newjob;
      delete dto.job_id;
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

  async saveUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const entity = this.userRepo.create(data);
    return await this.userRepo.save(entity);
  }
  async findLastUserByCode(prefix: string): Promise<UserEntity | null> {
    return await this.userRepo
      .createQueryBuilder('user')
      .orderBy('user.code', 'DESC')
      .where('user.code LIKE :prefix', { prefix: `${prefix}%` })
      .getOne();
  }

  async searchUser(username: string): Promise<any>{
    return this.userRepo.findOne({
      where : { username: ILike(`%${username}%`)} ,       
      relations: ['job', 'job.system', 'job.system.funcs'],
    });
  }

}
