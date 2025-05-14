import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/userRepository.interface";

@Injectable()
export class GenerateUniqueCode{
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository

    async execute(): Promise<string> {
    const prefix = 'AC-';
    
    // Tìm bản ghi có code lớn nhất
    const lastUser = await this.userRepo.findLastUserByCode('AC-')
  
    let nextNumber = 1;
  
    if (lastUser?.code) {
      const lastNumber = parseInt(lastUser.code.replace(prefix, ''), 10);
      nextNumber = lastNumber + 1;
    }
  
    // Format: AC-000001
    const nextCode = `${prefix}${String(nextNumber).padStart(6, '0')}`;
    return nextCode;
  }
}

