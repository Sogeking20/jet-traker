import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [UserModule, CompanyModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
})
export class EmployeeModule {}
