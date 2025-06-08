import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/users';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-responce.dto';
import { UserLoginResponseDto } from 'src/users/dto/user-login-response.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Throttle } from '@nestjs/throttler';
import { register } from 'module';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @ApiResponse({ status: 201, type: UserResponseDto })
  @ApiOperation({ 
    summary: "Реєстрація нового користувача у системі",
    description: "3 спроби раз на п'ять хвилин"
  })
  @Throttle({ register: { limit: 3, ttl: 300000 } }) 
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(dto);
  }
    

  @Throttle({ login: { limit: 3, ttl: 300000 } }) 
  @Post('login')
  @ApiOperation({ summary: 'Увійти та отримати JWT + данні користувача', 
    description: "3 cпроби раз у 5 хвилин" })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, type: UserLoginResponseDto })
  async login(@Body() dto: LoginUserDto): Promise<UserLoginResponseDto> {
    return this.authService.login(dto.email, dto.password);
  }
}