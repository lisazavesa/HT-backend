import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'SupePassword123',
    description: 'Пароль (минимум 4 символа)',
    minLength: 4,
  })
  @IsString()
  @MinLength(4)
  password: string;
}