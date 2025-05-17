import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';

export const Auth = () => UseGuards(JwtAuthGuard, RolesGuard);
