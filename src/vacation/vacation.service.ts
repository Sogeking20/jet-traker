import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class VacationService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
    private CompanyService: CompanyService,
  ) {}

  async create(companyId: number, dto: CreateVacationDto) {
    const user = await this.UserService.getByEmail(dto.email);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== companyId) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    const { email, ...data } = dto;

    return await this.prisma.vacation.create({
      data: {
        ...data,
        userId: user.id,
        companyId,
        status: 'APPROVED',
      },
    });
  }

  async update(companyId: number, vacationId: number, dto: UpdateVacationDto) {
    const vacation = await this.getVacationById(vacationId);

    if (!vacation) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (vacation.companyId !== companyId) {
      throw new BadRequestException(
        'У вас нет доступа',
      );
    }

    return await this.prisma.vacation.update({
      where: {
        id: vacationId,
      },
      data: dto
    });
  }

  async getVacationById(id: number) {
    return this.prisma.vacation.findUnique({
      where: {
        id,
      },
    });
  }
}
