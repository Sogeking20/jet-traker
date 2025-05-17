import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum Status {
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
}

export class AddEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  post: string;

  @IsString()
  subunit: string;

  @IsEnum(Status)
  role: Status;

  @IsNumber()
  salary: number;
}
