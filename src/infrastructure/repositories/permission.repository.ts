import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, ILike } from 'typeorm';

import { IPermissionRepository } from 'src/domain/repositories/permissionRepository.interface';
import { createPermissionDto } from 'src/controller/permission/dtos/create.dto';
import { updatePermissionDto } from 'src/controller/permission/dtos/update.dto';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepo: Repository<PermissionEntity>,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}


  async findAll(): Promise<PermissionEntity[]>{
    return await this.permissionRepo.find();
  }

  async create(dto: createPermissionDto): Promise<any>{
    try{
      const existingPermission = await this.permissionRepo.findOne({where: {name: dto.name}});
      if(existingPermission)
        return { message: 'Choose another name'};

      const newPermission = this.permissionRepo.create({
        ...dto
      });
      return await this.permissionRepo.save(newPermission);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }

  async update(id: number, dto: updatePermissionDto): Promise<any> {
    try{
      const permission = await this.permissionRepo.findOne({where: {id: id}});
      const update = {...permission,  ...dto};
      return await this.permissionRepo.save(update);
    }
    catch (err){    
      console.error('Error creating user:', err);
    }
  }


  async delete(id: number): Promise<any> {
    const func = await this.permissionRepo.findOne({
      where :{id: id}
    });
    return await this.permissionRepo.delete(func);
  }

}
