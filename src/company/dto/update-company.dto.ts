import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCompanyDto {
  @MinLength(6)
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  industry: string;

  @IsString()
  @IsOptional()
  timeZone: string;
}
