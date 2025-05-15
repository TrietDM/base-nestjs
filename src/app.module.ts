import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ControllersModule } from './controller/controllers.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UserUseCasesModule } from './usecases/usecase.module';
import { JwtMiddleware } from './usecases/jwt.middleware';
import { RoleMiddleware } from './usecases/role.middleware';
import { JwtService } from '@nestjs/jwt';
import { JobController } from './controller/job/job.controller';
import { UsersController } from './controller/user/user.controller';
import { PermissionController } from './controller/permission/permission.controller';
import { FunctionController } from './controller/function/function.controller';
import { SystemController } from './controller/system/systemcontroller';

@Module({
  imports: [
    EnvironmentConfigModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    ControllersModule,
    UserUseCasesModule,
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const publicRoutes = [
      { path: 'jobs', method: RequestMethod.GET},
      { path: 'users', method: RequestMethod.GET},
      { path: 'users', method: RequestMethod.POST},
      { path: 'permissions', method: RequestMethod.GET},
      { path: 'systems', method: RequestMethod.GET},
      { path: 'functions', method: RequestMethod.GET},
    ];

    const privateRoutes = [
      { path: 'users*', method: RequestMethod.DELETE},
      { path: 'users/:id/status', method: RequestMethod.PUT},
      { path: 'jobs*', method: RequestMethod.DELETE},
      { path: 'permissions*', method: RequestMethod.DELETE},
      { path: 'systems*', method: RequestMethod.DELETE},
      { path: 'functions*', method: RequestMethod.DELETE},
    ];

    consumer
    .apply(JwtMiddleware)
    .exclude(...publicRoutes)
    .forRoutes(
      JobController,
      UsersController,
      PermissionController,
      FunctionController,
      SystemController
    );

    consumer
    .apply(RoleMiddleware('admin'))
    .forRoutes(...privateRoutes)
  }
}
