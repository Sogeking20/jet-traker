import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [UserModule, CompanyModule, NotificationModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
