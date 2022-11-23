import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService 
{
    constructor (
        @InjectRepository(Report) private readonly repo: Repository<Report> 
    ) {}

    async create (report: CreateReportDTO, user: User)
    {
        const newReport = this.repo.create(report);
        newReport.user = user;
        return this.repo.save (newReport);
    }
}
