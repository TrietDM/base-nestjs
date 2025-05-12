import { createSystemDto } from "src/controller/system/dtos/create.dto";
import { updateSystemDto } from "src/controller/system/dtos/update.dto";
import { SystemEntity } from "src/infrastructure/entities/system.entity";

export interface ISystemRepository {
  findAll(): Promise<SystemEntity[]>;
  create(dto: createSystemDto): Promise<any>;
  update(id: number, dto: updateSystemDto): Promise<SystemEntity>;
  delete(id: number): Promise<any>;

}
