import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { IJobRepository } from 'src/domain/repositories/jobRepository.interface';
import { createJobDto } from './dtos/create.dto';
import { updateJobDto } from './dtos/update.dto';
import { JobDetailViewModel, JobListViewModel } from 'src/domain/model/job.model';

    @Controller('jobs')
    export class JobController {
        constructor(
            @Inject('IJobRepository')
            private readonly jobRepo: IJobRepository,
        ) {}

    @Get()
    async getallJobs(): Promise<JobListViewModel[]> {
        const jobs = await this.jobRepo.findAll();
        return jobs.map((job) => new JobListViewModel(job));
    }

    @Get('/search')
    async search(@Body() search: { name?: string; system?: number; is_active?: boolean } ){
        const jobs = await this.jobRepo.search(search);
        return jobs.map((job) => new JobListViewModel(job));
    }

    @Get('/filter')
    async filter(@Body() filter: { name?: string; system?: number; is_active?: boolean } ){
        const jobs = await this.jobRepo.search(filter);
        return jobs.map((job) => new JobListViewModel(job));
    }


    @Get('/search/:id')
    async getJob(@Param('id') id: any){
        const job = await this.jobRepo.getById(id);
        return new JobDetailViewModel(job);
    }

 
    @Post('/create')
    async register(@Body() body: createJobDto){
        return this.jobRepo.create(body);
    }


    @Put(':id')
    async updateUser(@Param('id') id: number,@Body() body: updateJobDto){
        return this.jobRepo.updateJob(id,body);
    }

    @Put(':id/status')
    async updateStatus(@Param('id') id: number){
        return this.jobRepo.updateStatus(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.jobRepo.delete(id);
    }
}