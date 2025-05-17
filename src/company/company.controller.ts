import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @HttpCode(200)
  @Post()
  @Auth()
  async create(
    @Body() dto: CreateCompanyDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.companyService.create(userId, dto);
  }
}
