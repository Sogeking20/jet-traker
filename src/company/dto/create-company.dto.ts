import { IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @MinLength(6)
  @IsString()
  name: string;

  @IsString()
  industry: string;

  @IsString()
  timeZone: string;
}
