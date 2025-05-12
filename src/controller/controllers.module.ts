import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
// import { authUseCases } from 'src/usecases/auth.usecases';
import { AuthController } from './auth/auth.controllers';
import { UsersController } from './user/user.controller';
import { JobController } from './job/job.controller';
import { FunctionController } from './function/function.controller';
import { PermissionController } from './permission/permission.controller';
import { SystemController } from './system/systemcontroller';

@Module({
  imports: [RepositoriesModule, EnvironmentConfigModule],
  controllers: [AuthController,
    UsersController,
    JobController,
    FunctionController,
    PermissionController,
    SystemController],
  // providers: [authUseCases],
})
export class ControllersModule {}

