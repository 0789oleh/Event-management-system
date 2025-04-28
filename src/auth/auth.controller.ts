import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/users';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('register')
    async register(@Body() body: any, @CurrentUser() user: User) {
      const {name, email, password} = body;
      return this.authService.register(name, email, password);
    }

    @Post('login')
    async login (@Body() body: any, @CurrentUser() user: User) {
        const {email, password} = body;
        return this.authService.login(email, password);
    }
  }