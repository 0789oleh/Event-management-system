import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@Throttle({default: {limit: 3, ttl: 300000}})
@ApiTags('user') // Tag for this controller
export class UserController {
  // ... register and login are already exist

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
