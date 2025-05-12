import { createFunctionDto } from "src/controller/function/dtos/create.dto";
import { updateFunctionDto } from "src/controller/function/dtos/update.dto";
import { FunctionEntity } from "src/infrastructure/entities/function.entity";

export interface IFunctionRepository {
  findAll(): Promise<FunctionEntity[]>;
  create(dto: createFunctionDto): Promise<any>;
  update(id: number, dto: updateFunctionDto): Promise<FunctionEntity>;
  delete(id: number): Promise<any>;

}
