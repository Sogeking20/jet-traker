import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateCompanyDto) {
    const userCompany = await this.getByUserCompany(userId);

    if (userCompany)
      throw new BadRequestException(
        'Пользователь уже состоит в другой компании',
      );

    const company = await this.prisma.company.create({
      data: {
        ...dto,
        employees: {
          connect: { id: userId }, // Связываем существующего пользователя
        },
      },
    });

    // Обновляем роль пользователя на ADMIN
    await this.prisma.user.update({
      where: { id: userId },
      data: { role: 'MANAGER' }, // Назначаем роль
    });

    return company;
  }

  async update(dto: UpdateCompanyDto, id: number) {
    let data = dto;

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async getByUserCompany(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
        companyId: {
          not: null, // Убедимся, что у пользователя есть companyId
        },
      },
    });
  }

  async getByCompany(id: number) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }
}
