import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { hash } from 'argon2';
import { Role } from '@prisma/client';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      // include: {
      //   tasks: true,
      // },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(dto: AuthDto) {
    const user = {
      email: dto.email,
      name: '',
      password: await hash(dto.password),
      role: Role.EMPLOYEE,
    };

    return this.prisma.user.create({
      data: user,
    });
  }

  async update(dto: UserDto, id: number) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
