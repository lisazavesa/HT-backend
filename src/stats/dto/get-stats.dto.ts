import { IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class GetStatsDto {
    @ApiProperty()
    @IsInt()
    @Type(() => Number)
    habitId: number;

    @ApiPropertyOptional({ example: "2026-03-01" })
    @IsOptional()
    @IsString()
    from?: string;

    @ApiPropertyOptional({ example: "2026-03-30" })
    @IsOptional()
    @IsString()
    to?: string;
}
