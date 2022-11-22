import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService 
{
    constructor (
        @InjectRepository(Report) private readonly repo: Repository<Report> 
    ) {}

    async create (report: CreateReportDTO)
    {
        const newReport = this.repo.create(report);

        return this.repo.save (newReport);
    }
}
