import { createPermissionDto } from "src/controller/permission/dtos/create.dto";
import { updatePermissionDto } from "src/controller/permission/dtos/update.dto";
import { PermissionEntity } from "src/infrastructure/entities/permission.entity";

export interface IPermissionRepository {
  findAll(): Promise<PermissionEntity[]>;
  create(dto: createPermissionDto): Promise<any>;
  update(id: number, dto: updatePermissionDto): Promise<PermissionEntity>;
  delete(id: number): Promise<any>;
}
