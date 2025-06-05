import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/users';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from 'src/users/dto/user-responce.dto';
import { UserLoginResponseDto } from 'src/users/dto/user-login-response.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @ApiResponse({ status: 201, type: UserResponseDto })
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(dto);
  }
    

  @Post('login')
  @ApiOperation({ summary: 'Войти и получить JWT + данные пользователя' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({ status: 200, type: UserLoginResponseDto })
  async login(@Body() dto: LoginUserDto): Promise<UserLoginResponseDto> {
    return this.authService.login(dto.email, dto.password);
  }
  }