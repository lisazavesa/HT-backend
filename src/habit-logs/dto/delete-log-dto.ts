import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class DeleteLogDto {
    @ApiProperty({ example: 1, description: "ID привычки" })
    @IsInt()
    @Type(() => Number)
    habitId: number;

    @ApiProperty({
        example: "2026-01-23",
        description: "Дата в формате YYYY-MM-DD",
    })
    @IsString()
    date: string;
}
