import { createJobDto } from "src/controller/job/dtos/create.dto";
import { updateJobDto } from "src/controller/job/dtos/update.dto";
import { JobEntity } from "src/infrastructure/entities/job.entity";

export interface IJobRepository {
  findAll(): Promise<JobEntity[]>;
  getById(id: number): Promise<JobEntity>;
  create(dto: createJobDto): Promise<any>;
  updateJob(id: number, dto: updateJobDto): Promise<JobEntity>;
  updateStatus(id: number): Promise<JobEntity>;
  delete(id: number): Promise<any>;
  filter(filter:{name?: string; system?: string; is_active?: boolean}): Promise<any>
  search(filter:{name?: string; system?: string; is_active?: boolean}): Promise<any>
}
