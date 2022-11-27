import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

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

    async changeApproval (id: number, approved: boolean)
    {
        const report = await this.repo.findOneBy({ id });
        if (!report)
            throw new NotFoundException ('Report not found.');
        report.approved = approved;
        return await this.repo.save (report);
    }

    async createEstimate (estimate: GetEstimateDTO)
    {
        return this.repo
            .createQueryBuilder ()
            .select ('AVG(price)', 'price')
            .where ('make = :make', { make: estimate.make })
            .andWhere ('model = :model', { model: estimate.model })
            .andWhere ('longitude - :longitude BETWEEN -5 AND 5', { longitude: estimate.longitude })
            .andWhere ('latitude - :latitude BETWEEN -5 AND 5', { latitude: estimate.latitude })
            .andWhere ('year  - :year BETWEEN -3 AND 3', { year: estimate.year })
            .orderBy ('ABS(mileage - :mileage)', 'DESC')
            .setParameters ({ mileage: estimate.mileage })
            .limit (3)
            .getRawOne ();   
    }
}
