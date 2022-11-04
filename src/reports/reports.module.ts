import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  controllers: [ReportsController],
  exports: [ReportsService],
  providers: [ReportsService]
})
export class ReportsModule {};
