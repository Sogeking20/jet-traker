import { IsEnum } from 'class-validator';

enum Status {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class ReviewRequestDto {
  @IsEnum(Status)
  status: Status;
}
