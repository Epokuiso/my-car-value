import { 
    Controller, 
    Post, 
    Body, 
    UseGuards , 
    Patch, 
    Param, 
    ParseIntPipe, 
    Get, 
    Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDTO } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDTO } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController 
{
    constructor (private readonly reportsService: ReportsService) {}

    
    @Post()
    @UseGuards (AuthGuard)
    @Serialize (ReportDTO)
    createReport (@Body () report: CreateReportDTO, @CurrentUser () user: User) 
    {
        return this.reportsService.create (report, user);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport (@Param('id', ParseIntPipe) id: number, @Body() report: ApproveReportDTO)
    {
        return this.reportsService.changeApproval (id, report.approved);
    }

    @Get()
    getEstimate (@Query() query: GetEstimateDTO)
    {
        return this.reportsService.createEstimate (query);   
    } 

}
