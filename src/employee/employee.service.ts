import { CompanyService } from './../company/company.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './../user/user.service';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
    private CompanyService: CompanyService,
  ) {}

  async getEmployees(companyId: number, userId: number) {
    const user = await this.UserService.getById(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== companyId) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    return this.prisma.user.findMany({
      where: {
        companyId,
      },
    });
  }

  async addEmployee(companyId: number, dto: AddEmployeeDto) {
    const user = await this.UserService.getByEmail(dto.email);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    const userCompany = await this.CompanyService.getByUserCompany(user.id);

    if (userCompany)
      throw new BadRequestException('Пользователь уже состоит в компании');

    const { email, ...data } = dto;

    return await this.prisma.user.update({
      where: { email: email },
      data: {
        ...data,
        companyId: company.id, // Добавляем компанию
      },
    });
  }

  async updateEmployee(
    emailUser: string,
    companyId: number,
    dto: AddEmployeeDto,
  ) {
    const user = await this.UserService.getByEmail(dto.email);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== company.id) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    if (emailUser == dto.email)
      throw new BadRequestException('Вы не можете удалить самого себя');

    const { email, ...data } = dto;

    return await this.prisma.user.update({
      where: { email: email },
      data: {
        ...data,
      },
    });
  }

  async deleteEmployee(
    emailUser: string,
    companyId: number,
    dto: DeleteEmployeeDto,
  ) {
    const user = await this.UserService.getByEmail(dto.email);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== company.id) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    if (emailUser == dto.email)
      throw new BadRequestException('Вы не можете удалить самого себя');

    return await this.prisma.user.update({
      where: { email: dto.email },
      data: {
        companyId: null,
        post: null,
        subunit: null,
        salary: null,
        role: 'EMPLOYEE',
      },
    });
  }
}
