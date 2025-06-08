import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UserLoginResponseDto } from 'src/users/dto/user-login-response.dto';
import { UserResponseDto } from 'src/users/dto/user-responce.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private readonly logger = new Logger(AuthService.name)

  async login(email: string, password: string): Promise<UserLoginResponseDto> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      this.logger.warn(`Can't authorize user`)
      throw new UnauthorizedException('Хибний email або пароль');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token, user: { id: user.id, name: user.name, email: user.email } };
  }
  
  async register(dto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log(`Starting a new user creation. Transfering task to userService`)
    return this.userService.register(dto);
  }

  async validateToken(payload: any) {
    return this.userService.findByEmail(payload.email);
  }
}