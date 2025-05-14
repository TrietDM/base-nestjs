// user-usecases.module.ts
import { Module } from '@nestjs/common';
import { GenerateUniqueCode } from 'src/usecases/generateUniqueCode.usecase';
import { RegisterUserUseCase } from './register.usecase';
import { LoginUserUseCase } from './login.usecase';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
    imports: [RepositoriesModule,
        JwtModule.register({}),
    ],
    providers: [RegisterUserUseCase,
     GenerateUniqueCode,
     LoginUserUseCase,
    ],
    exports: [RegisterUserUseCase,
    LoginUserUseCase,
  ],
})
export class UserUseCasesModule {}
