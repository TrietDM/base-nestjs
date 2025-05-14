import { JobEntity } from "src/infrastructure/entities/job.entity";

export class JobListViewModel{
    id: number;
    name: string;
    systemName: string;
    functions: {
        name: string;
        permission: string[];
    }[];
    description: string;
    isActive: boolean;
    constructor(entity: JobEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.department;
    this.isActive = entity.is_active;
    this.systemName = entity.system?.name || '';
    this.functions = entity.system?.funcs.map(f => ({
        name: f.name,
        permission: f.permissions.map(p => p.name)
    })) || [];
  }

}

export class JobDetailViewModel{
    id: number;
    industry: string;
    company: string;
    unit: string;
    department: string;
    own: string;
    systemName: string;
    functions: {
        name: string;
        permission: string[];
    }[];
    description: string;
    isActive: boolean;
    constructor(entity: JobEntity) {
    this.id = entity.id;
    this.industry = entity.industry;
    this.company =  entity.company;
    this.unit = entity.unit;
    this.department =  entity.department;
    this.own = entity.own;
    this.description = entity.department;
    this.isActive = entity.is_active;
    this.systemName = entity.system?.name || '';
    this.functions = entity.system?.funcs.map(f => ({
        name: f.name,
        permission: f.permissions.map(p => p.name)
    })) || [];
  }

}