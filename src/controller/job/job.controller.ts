import { Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import { IJobRepository } from 'src/domain/repositories/jobRepository.interface';
import { createJobDto } from './dtos/create.dto';
import { updateJobDto } from './dtos/update.dto';

    @Controller('jobs')
    export class JobController {
        constructor(
            @Inject('IJobRepository')
            private readonly jobRepo: IJobRepository,
        ) {}

    @Get()
    async getallJobs() {
        return this.jobRepo.findAll();
    }

    @Get('/search')
    async search(@Body() filter: { name?: string; system?: string; is_active?: boolean } ){
        return this.jobRepo.search(filter);
    }

    @Get('/filter')
    async filter(@Body() filter: { name?: string; system?: string; is_active?: boolean } ){
        return this.jobRepo.filter(filter);
    }


    @Get(':id')
    async getJob(@Param('id') id: any){
        return this.jobRepo.getById(id);
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