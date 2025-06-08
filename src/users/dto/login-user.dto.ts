import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '1234' })
  password: string;
}
