import {
  Controller,
  UsePipes,
  HttpCode,
  Put,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.update(dto, id);
  }
}
