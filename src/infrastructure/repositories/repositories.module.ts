import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { JobEntity } from '../entities/job.entity';
import { JobRepository } from './job.repository';
import { PermissionRepository } from './permission.repository';
import { FunctionRepository } from './funtion.repository';
import { SystemRepository } from './system.repository';
import { PermissionEntity } from '../entities/permission.entity';
import { SystemEntity } from '../entities/system.entity';
import { FunctionEntity } from '../entities/function.entity';
@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([UserEntity,JobEntity,PermissionEntity,SystemEntity,FunctionEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IJobRepository',
      useClass: JobRepository, 
    },
    {
      provide: 'IPermissionRepository',
      useClass: PermissionRepository, 
    },
    {
      provide: 'IFunctionRepository',
      useClass: FunctionRepository, 
    },
    {
      provide: 'ISystemRepository',
      useClass: SystemRepository,
    }
  ],
  exports: ['IUserRepository',
    'IJobRepository',
    'IPermissionRepository',
    'IFunctionRepository',
    'ISystemRepository'],
})
export class RepositoriesModule {}
  