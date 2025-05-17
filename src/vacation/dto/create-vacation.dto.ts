import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum TypeRequest {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export class CreateVacationDto {
  @IsEmail()
  email: string;

  @IsEnum(TypeRequest)
  type: TypeRequest;

  @Type(() => Date)
  @IsDate()
  fromDate: Date;

  @Type(() => Date)
  @IsDate()
  toDate: Date;
}
