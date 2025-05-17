import { IsEmail } from 'class-validator';

export class DeleteEmployeeDto {
  @IsEmail()
  email: string;
}
