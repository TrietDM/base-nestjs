import { JwtService } from "@nestjs/jwt";
import { IUserRepository } from "src/domain/repositories/userRepository.interface";
import * as bcrypt from "bcryptjs";
import { loginUserDto } from "src/controller/user/dtos/login.dto";
import { Inject } from "@nestjs/common";


export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: loginUserDto): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.userRepo.searchUser(dto.username);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, username: user.username,role: user.job.system.name };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
