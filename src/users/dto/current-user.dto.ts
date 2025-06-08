import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CurrentUserDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;
}