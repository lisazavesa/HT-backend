import { HabitStatus } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class UpsertHabitLogsDto {
    @IsInt()
    habitId: number;

    @IsString()
    date: string;

    @IsEnum(HabitStatus)
    status: HabitStatus
}