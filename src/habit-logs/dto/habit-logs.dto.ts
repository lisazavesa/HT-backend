import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetHabitLogsDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Type(() => Number)
    habitId: number;

    @ApiPropertyOptional({ example: "2026-01-01" })
    @IsString()
    @IsOptional()
    from?: string;

    @ApiPropertyOptional({ example: "2026-01-31" })
    @IsString()
    @IsOptional()
    to?: string;
}