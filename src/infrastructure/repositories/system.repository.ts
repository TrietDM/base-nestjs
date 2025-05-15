import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';

import { ISystemRepository } from 'src/domain/repositories/systemRepository.interface';
import { SystemEntity } from '../entities/system.entity';
import { createSystemDto } from 'src/controller/system/dtos/create.dto';
import { updateSystemDto } from 'src/controller/system/dtos/update.dto';
import { FunctionEntity } from '../entities/function.entity';

@Injectable()
export class SystemRepository implements ISystemRepository {
  constructor(
    @InjectRepository(SystemEntity)
    private systemRepo: Repository<SystemEntity>,
    @InjectRepository(FunctionEntity)
    private functionRepo: Repository<FunctionEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<SystemEntity[]>{
    return await this.systemRepo.find();
  }

  async create(dto: createSystemDto): Promise<any>{
    try{
      const existingSystem = await this.systemRepo.findOne({where: {name: dto.name}});
      if(existingSystem)
        return { message: 'Choose another name'};

      const names = dto.functions.map(p => p.name);
      const funcs = await this.functionRepo.find({
        where: names.map(name => ({name}))
    });

      if(funcs.length !== names.length)
        return { message: 'Function not exist'};
      


      const newSystem = this.systemRepo.create({
        ...dto,
        funcs
      });
      return await this.systemRepo.save(newSystem);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }

  async update(id: number, dto: updateSystemDto): Promise<any> {
    try{
      const existingSystem = await this.systemRepo.findOne({where: {name: dto.name}});
      if(!existingSystem)
        return { message: 'Choose another name'};

      const system = await this.systemRepo.findOne({where: {id}});
      const names = dto.functions.map(p => p.name);
      const funcs = await this.functionRepo.find({
        where: names.map(name => ({name}))
    });

      if(funcs.length !== names.length)
        return { message: 'Function not exist'};

      system.name = dto.name;
      system.funcs = funcs;
      return await this.systemRepo.save(system);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }


  async delete(id: number): Promise<any> {
    return await this.systemRepo.delete(id);
  }

}
