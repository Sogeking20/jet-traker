import { IsDate, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum TypeRequest {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

enum StatusRequest {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
  }

export class UpdateVacationDto {
  @IsEnum(TypeRequest)
  type: TypeRequest;

  @Type(() => Date)
  @IsDate()
  fromDate: Date;

  @Type(() => Date)
  @IsDate()
  toDate: Date;

  @IsEnum(StatusRequest)
  status: StatusRequest;
}
