import { ApiProperty } from "@nestjs/swagger";
import { HabitStatus } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class UpsertHabitLogsDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    habitId: number;

    @ApiProperty({ example: "2026-01-01" })
    @IsString()
    date: string;

    @ApiProperty({ enum: HabitStatus, example: HabitStatus.done })
    @IsEnum(HabitStatus)
    status: HabitStatus;
}