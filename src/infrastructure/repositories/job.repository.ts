import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';

import { IJobRepository } from 'src/domain/repositories/jobRepository.interface';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { JobEntity } from '../entities/job.entity';
import { createJobDto } from 'src/controller/job/dtos/create.dto';
import { updateJobDto } from 'src/controller/job/dtos/update.dto';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class JobRepository implements IJobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<JobEntity[]>{
    return await this.jobRepo.find();
  }

  async getById(id: number): Promise<JobEntity>{
    return await this.jobRepo.findOne({
      where :{id: id}    
    });
  }

  async create(dto: createJobDto): Promise<any>{
    try{
      const existingJob = await this.jobRepo.findOne({where: {name: dto.name}});
      const code = await this.generateUniqueCode();

      if(existingJob)
        return { message: 'Choose another name'};
      const newJob = this.jobRepo.create({
        ...dto,
        code,
      });
      
      return await this.jobRepo.save(newJob);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }


  async updateJob(id: number,dto: updateJobDto): Promise<JobEntity>{
    const user = await this.jobRepo.findOne({
      where :{id: id}
    });
    const updatedUser = { ...user, ...dto };
    return await this.jobRepo.save(updatedUser);
  }

  async updateStatus(id: number): Promise<JobEntity>{
    const user = await this.jobRepo.findOne({
      where :{id: id}
    });
    user.is_active = !user.is_active;
    return await this.jobRepo.save(user);
  }

  async delete(id: number): Promise<any> {
    const job = await this.jobRepo.findOne({
      where :{id: id}
    });
    if(job.using_num != 0)
      return { message: "Job in use"};
    return await this.jobRepo.delete(job);
  }


  async search(filter:{name?: string; system?: string; is_active?: boolean}): Promise<any>{
    return this.jobRepo.find({
      where : [
        { name: ILike(`%${filter.name}%`) },
        { system: ILike(`%${filter.name}%`) },
        { is_active: filter.is_active },
      ]
    });
  }

  async filter(filter:{name?: string; system?: string; is_active?: boolean}): Promise<any>{
    const where: any = {};

    if (filter.name) where.name = filter.name;
    if (filter.system) where.system = filter.system;
    if (filter.is_active !== undefined) where.is_active = filter.is_active;

    return this.jobRepo.find({ where });
  }




  private async generateUniqueCode(): Promise<string> {
    const prefix = 'R-';
    
    // Tìm bản ghi có code lớn nhất
    const lastUser = await this.jobRepo
      .createQueryBuilder('job')
      .orderBy('job.code', 'DESC')
      .where("job.code LIKE :prefix", { prefix: `${prefix}%` })
      .getOne();
  
    let nextNumber = 1;
  
    if (lastUser?.code) {
      const lastNumber = parseInt(lastUser.code.replace(prefix, ''), 10);
      nextNumber = lastNumber + 1;
    }
  
    // Format: R-000001
    const nextCode = `${prefix}${String(nextNumber).padStart(6, '0')}`;
    return nextCode;
  }

}
