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
import { SystemEntity } from '../entities/system.entity';
dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class JobRepository implements IJobRepository {
  constructor(
    @InjectRepository(JobEntity)
    private jobRepo: Repository<JobEntity>,
    @InjectRepository(SystemEntity)
    private systemRepo: Repository<SystemEntity>,
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
      const system = await this.systemRepo.findOneBy({ id: dto.systemId });
      
      if(existingJob)
        return { message: 'Choose another name'};
      const newJob = this.jobRepo.create({
        ...dto,
        code,
      system,
      });
      
      return await this.jobRepo.save(newJob);
    }
    catch (err){    
      console.error('Error creating job:', err);
    }
  }


  async updateJob(id: number,dto: updateJobDto): Promise<any>{
    const job = await this.jobRepo.findOne({
      where :{id: id}
    });
    const system = await this.systemRepo.findOneBy({ id: dto.systemId });
    job.system = system;
    const updatedUser = { ...job, ...dto };
    return await this.jobRepo.save(updatedUser);
  }

  async updateStatus(id: number): Promise<JobEntity>{
    const job = await this.jobRepo.findOne({
      where :{id: id}
    });
    job.is_active = !job.is_active;
    return await this.jobRepo.save(job);
  }

  async delete(id: number): Promise<any> {
    const job = await this.jobRepo.findOne({
      where :{id: id}
    });
    if(job.using_num != 0)
      return { message: "Job in use"};
    return await this.jobRepo.delete(job);
  }


  async search(search:{name?: string; system?: number; is_active?: boolean}): Promise<JobEntity[]>{
    const where: any = {};

    if (search.name) where.name = search.name;
    if (search.system) where.system = {id: search.system};
    if (search.is_active !== undefined) where.is_active = search.is_active;

    return this.jobRepo.find({ where });
  }

  async filter(filter:{name?: string; system?: number; is_active?: boolean}): Promise<any>{
    const where: any = {};

    if (filter.name) where.name = filter.name;
    if (filter.system) where.system = {id: filter.system};
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

  async save(data: Partial<JobEntity>): Promise<any>{
    const save = await this.jobRepo.create(data)
    return this.jobRepo.save(save);
  }

}
