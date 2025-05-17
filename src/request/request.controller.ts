import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { ReviewRequestDto } from './dto/review-request.dto';
import { HasCompany } from 'src/decorators/company.decorator';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @HttpCode(200)
  @Get('/company')
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async getRequestCompany(
    @CurrentUser('id') userId: number,
    @CurrentUser('companyId') companyId: number,
  ) {
    return this.requestService.getRequestCompany(companyId, userId);
  }

  @HttpCode(200)
  @Get('/employee')
  @Auth()
  @HasCompany()
  @Roles('EMPLOYEE')
  async getRequestEmployee(@CurrentUser('id') userId: number) {
    return this.requestService.getRequestEmployee(userId);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  @HasCompany()
  @Roles('EMPLOYEE')
  async create(
    @Body() dto: CreateRequestDto,
    @CurrentUser('id') userId: number,
    @CurrentUser('companyId') companyId: number,
  ) {
    return this.requestService.create(companyId, userId, dto);
  }

  @HttpCode(200)
  @Put(':id')
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async reviewRequest(
    @Param('id') requestId: number,
    @Body() dto: ReviewRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.requestService.reviewRequest(requestId, userId, dto);
  }
}
