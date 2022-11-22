import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController 
{
    constructor (private readonly reportsService: ReportsService) {}

    @UseGuards (AuthGuard)
    @Post()
    createReport (@Body () report: CreateReportDTO) 
    {
        return this.reportsService.create (report);
    }
}
