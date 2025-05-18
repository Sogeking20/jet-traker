import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { RequestModule } from './request/request.module';
import { VacationModule } from './vacation/vacation.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, CompanyModule, EmployeeModule, RequestModule, VacationModule, NotificationModule],
})
export class AppModule {}
