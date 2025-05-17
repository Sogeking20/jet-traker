import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum TypeRequest {
  VACATION = 'VACATION',
  SICK_LEAVE = 'SICK_LEAVE',
  DAY_OFF = 'DAY_OFF',
}

export class CreateRequestDto {
  @IsEnum(TypeRequest)
  type: TypeRequest;

  @Type(() => Date)
  @IsDate()
  fromDate: Date;

  @Type(() => Date)
  @IsDate()
  toDate: Date;

  @IsString()
  @IsOptional()
  reason: string;
}
