import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({example: "Exhibition"})
  name: string;
  @ApiProperty({example: "Aivazovsky's paintings exhibition"})
  description: string;
  @ApiProperty({example: "Nature Museum, Middletown"})
  location: string;
  @ApiProperty({example: 250})
  maxParticipants: number;
}