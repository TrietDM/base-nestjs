import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AspectLogger } from 'src/utils/interceptors/logging.interceptor';
import { TransformationInterceptor } from 'src/utils/interceptors/transform.interceptor';
import { AuthUser } from 'src/utils/interceptors/user.decorator';

@Controller('/auth')
@UseInterceptors(TransformationInterceptor)
@UseInterceptors(AspectLogger)
@ApiBearerAuth('Authorization')
@ApiTags('Death/Remove')
export class AuthController {
  constructor() {}

  @Post('/login')
  async importDeath(@AuthUser() jwtpayload: any) {
    jwtpayload.userInfo?.username || '';
    return 'await this.deathUseCases.importChoosePigs(farmId, data)';
  }
}
