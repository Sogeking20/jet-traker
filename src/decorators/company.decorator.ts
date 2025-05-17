import { UseGuards } from '@nestjs/common';
import { CompanyGuard } from 'src/guards/company.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

export const HasCompany = () => UseGuards(JwtAuthGuard, CompanyGuard);
