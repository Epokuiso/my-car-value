import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('reports')
export class ReportsController 
{
    constructor (private readonly reportsService: ReportsService) {}

    @UseGuards (AuthGuard)
    @Post()
    createReport (@Body () report: CreateReportDTO, @CurrentUser () user: User) 
    {
        return this.reportsService.create (report, user);
    }
}
