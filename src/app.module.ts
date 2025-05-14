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

  ];
    consumer
    .apply(JwtMiddleware)
    .exclude(...publicRoutes)
    .forRoutes(
      JobController,
      UsersController
    );
  }
}
