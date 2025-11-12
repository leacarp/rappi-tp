import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterCustomerRequestService } from '../../services/dtos/register-customer-request-service';

export class RegisterCustomerDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  phone: string;

  toServiceDto(): RegisterCustomerRequestService {
    return new RegisterCustomerRequestService(
      this.email,
      this.password,
      this.name,
      this.phone
    );
  }
}

