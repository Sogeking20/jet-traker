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
import { EmployeeService } from './employee.service';
import { Auth } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { AddEmployeeDto } from './dto/add-employee.dto';
import { CurrentUser } from 'src/decorators/user.decorator';
import { DeleteEmployeeDto } from './dto/delete-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { HasCompany } from 'src/decorators/company.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @HttpCode(200)
  @Get()
  @Auth()
  @HasCompany()
  async getEmployees(
    @CurrentUser('companyId') companyId: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.employeeService.getEmployees(companyId, userId);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async addEmployee(
    @Body() dto: AddEmployeeDto,
    @CurrentUser('companyId') companyId: number,
  ) {
    return this.employeeService.addEmployee(companyId, dto);
  }

  @HttpCode(200)
  @Put()
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async updateEmployee(
    @Body() dto: UpdateEmployeeDto,
    @CurrentUser('companyId') companyId: number,
    @CurrentUser('email') emailUser: string,
  ) {
    return this.employeeService.updateEmployee(emailUser, companyId, dto);
  }

  @HttpCode(200)
  @Delete()
  @Auth()
  @HasCompany()
  @Roles('MANAGER')
  async deleteEmployee(
    @Body() dto: DeleteEmployeeDto,
    @CurrentUser('companyId') companyId: number,
    @CurrentUser('email') emailUser: string,
  ) {
    return this.employeeService.deleteEmployee(emailUser, companyId, dto);
  }
}
