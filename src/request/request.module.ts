import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { CompanyModule } from 'src/company/company.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [UserModule, CompanyModule, NotificationModule],
  controllers: [RequestController],
  providers: [RequestService, PrismaService],
})
export class RequestModule {}
