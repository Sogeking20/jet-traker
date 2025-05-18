import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
    private CompanyService: CompanyService,
  ) {}

  async createToCompany(message: string, companyId: number) {
    return await this.prisma.notification.create({
      data: {
        message,
        companyId
      }
    });
  }

  async createToUser(message: string, userId: number) {
    return await this.prisma.notification.create({
      data: {
        message,
        userId
      }
    });
  }

  async viewing(id: number) {
    return await this.prisma.notification.update({
      where: {
        id
      },
      data: {
        read: true
      }
    });
  }

  async deleteToUser(id: number, userId: number) {
    const user = await this.UserService.getById(userId);

    if (!user) throw new BadRequestException('Пользователь не существует');

    const notification = await this.getById(id);

    if (!notification) throw new BadRequestException('Уведомление не существует');

    if (notification.userId !== userId) throw new BadRequestException('У вас нет доступа');
    
    return await this.prisma.notification.delete({
      where: {
        id
      }
    });
  }

  async deleteToCompany(id: number, companyId: number) {
    const company = await this.CompanyService.getByCompany(companyId);

    if (!company) throw new BadRequestException('Компания не существует');

    const notification = await this.getById(id);

    if (!notification) throw new BadRequestException('Уведомление не существует');

    if (notification.companyId !== companyId) throw new BadRequestException('У вас нет доступа');
    
    return await this.prisma.notification.delete({
      where: {
        id
      }
    });
  }
  
  async getById(id: number) {
    return this.prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }
}
