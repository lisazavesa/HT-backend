import { IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateHabitDto {
    @ApiProperty({
        example: "Drink water",
        maxLength: 100,
    })
    @IsString()
    @MaxLength(100)
    title: string;

    @ApiPropertyOptional({
        example: "Drink 2 liters daily",
        maxLength: 500,
    })
    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}