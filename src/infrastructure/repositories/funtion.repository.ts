import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';

import { IFunctionRepository } from 'src/domain/repositories/functionRepository.interface';
import { FunctionEntity } from '../entities/function.entity';
import { createFunctionDto } from 'src/controller/function/dtos/create.dto';
import { updateFunctionDto } from 'src/controller/function/dtos/update.dto';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class FunctionRepository implements IFunctionRepository {
  constructor(
    @InjectRepository(FunctionEntity)
    private functionRepo: Repository<FunctionEntity>,
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<FunctionEntity[]>{
    return await this.functionRepo.find();
  }

  async create(dto: createFunctionDto): Promise<any>{
    try{
      const existingFunction = await this.functionRepo.findOne({where: {name: dto.name}});
      const names = dto.permissions.map(p => p.name);
      const permissions = await this.permissionRepo.find({
        where: names.map(name => ({name}))
    });

      if(permissions.length !== names.length)
        return { message: 'Permission not exist'};
      if(existingFunction)
        return { message: 'Choose another name'};


      const newFunction = this.functionRepo.create({
        ...dto,
        permissions,
    
      });
      return await this.functionRepo.save(newFunction);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }

  async update(id: number, dto: updateFunctionDto): Promise<any> {
    try{
      const existingFunction = await this.functionRepo.findOne({where: {id: id}});
      const names = dto.permissions.map(p => p.name);
      const permissions = await this.permissionRepo.find({
        where: names.map(name => ({name}))
    });

      if(permissions.length !== names.length)
        return { message: 'Permission not exist'};
      if(!existingFunction)
        return { message: 'No function under that name'};


      const update = {...existingFunction,...permissions};
      return await this.functionRepo.save(update);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }


  async delete(id: number): Promise<any> {
    return await this.functionRepo.delete(id);
  }

}
