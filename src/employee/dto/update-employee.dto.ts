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

export class UpdateEmployeeDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  post: string;

  @IsString()
  @IsOptional()
  subunit: string;

  @IsEnum(Status)
  @IsOptional()
  role: Status;

  @IsNumber()
  @IsOptional()
  salary: number;
}
