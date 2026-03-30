import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: "test@mail.com",
        description: "User email",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "password123",
        minLength: 6,
        description: "User password",
    })
    @IsString()
    @MinLength(6)
    password: string;
}