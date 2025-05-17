import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { PrismaService } from 'src/prisma.service';
import { CompanyModule } from 'src/company/company.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, CompanyModule],
  controllers: [VacationController],
  providers: [VacationService, PrismaService],
})
export class VacationModule {}
