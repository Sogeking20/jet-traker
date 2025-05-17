import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6)
  @IsString()
  @IsOptional()
  password: string;
}
