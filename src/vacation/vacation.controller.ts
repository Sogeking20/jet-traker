import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { VacationService } from './vacation.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { UpdateVacationDto } from './dto/update-vacation.dto';
import { HasCompany } from 'src/decorators/company.decorator';
import { Auth } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateRequestDto } from 'src/request/dto/create-request.dto';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('vacation')
export class VacationController {
  requestService: any;
  constructor(private readonly vacationService: VacationService) {}

  @HttpCode(200)
  @Post()
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async create(
    @Body() dto: CreateVacationDto,
    @CurrentUser('companyId') companyId: number,
  ) {
    return this.vacationService.create(companyId, dto);
  }
}
