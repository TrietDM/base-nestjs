import { IUserRepository } from "src/domain/repositories/userRepository.interface";
import * as bcrypt from "bcryptjs";
import { createUserDto } from "src/controller/user/dtos/register.dto";
import { GenerateUniqueCode } from "./generateUniqueCode.usecase";
import { IJobRepository } from "src/domain/repositories/jobRepository.interface";
import { Inject } from "@nestjs/common";
import { UserEntity } from "src/infrastructure/entities/user.entity";

export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
    @Inject('IJobRepository')
    private readonly jobRepo: IJobRepository,
    private readonly generateCode: GenerateUniqueCode,
  ) {}

  async execute(dto: createUserDto): Promise<UserEntity> {
    const user = await this.userRepo.search(dto.username);
    if(user)
        throw new Error('User being used');

    const code = await this.generateCode.execute();
    const hashPassword = await bcrypt.hash(dto.password,10);
    const job = await this.jobRepo.getById(dto.job_id);  
    if (!job) 
      throw new Error('Job not found');
    else{
      job.using_num++;
      await this.jobRepo.save(job);
    }

    
    const newuser = await this.userRepo.saveUser({
    ...dto,
    job,
    password: hashPassword,
    code,
    });

    return newuser;
  }
}
