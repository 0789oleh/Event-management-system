import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({example: 'John Doe'})
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({example: 'john2000@example.com'})
  email: string;

  @IsString()
  @ApiProperty({example: '1234wefb4'})
  password: string;
}