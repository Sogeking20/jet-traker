import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { ReviewRequestDto } from './dto/review-request.dto';

@Injectable()
export class RequestService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
    private CompanyService: CompanyService,
  ) {}

  async getRequestCompany(companyId: number, userId: number) {
    const user = await this.UserService.getById(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.getByCompanyWithRequest(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== companyId) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    return company.requests;
  }

  async getRequestEmployee(userId: number) {
    const user = await this.getByUserWithRequest(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    return user.requests;
  }

  async create(companyId: number, userId: number, dto: CreateRequestDto) {
    const user = await this.UserService.getById(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    if (user.companyId !== companyId) {
      throw new BadRequestException(
        'Пользователь не является сотрудником этой компании',
      );
    }

    return await this.prisma.request.create({
      data: {
        ...dto,
        userId,
        companyId,
        status: 'PENDING',
      },
    });
  }

  async reviewRequest(
    requestId: number,
    userId: number,
    dto: ReviewRequestDto,
  ) {
    const user = await this.UserService.getById(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const request = await this.getByRequest(requestId);

    if (!request) throw new BadRequestException('Такой заявки не существует');

    if (user.companyId !== request.companyId) {
      throw new BadRequestException('Нет доступа к заявке');
    }

    return await this.prisma.request.update({
      where: {
        id: requestId,
      },
      data: dto,
    });
  }

  async getByRequest(id: number) {
    return this.prisma.request.findUnique({
      where: {
        id,
      },
    });
  }

  async getByCompanyWithRequest(id: number) {
    return this.prisma.company.findUnique({
      where: {
        id,
      },
      include: {
        requests: true,
      },
    });
  }

  async getByUserWithRequest(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        requests: true,
      },
    });
  }
}
