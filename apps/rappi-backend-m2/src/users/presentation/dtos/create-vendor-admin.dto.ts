import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorAdminDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  restaurantName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  schedule: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  category: string;
}