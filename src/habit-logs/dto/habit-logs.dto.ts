import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetHabitLogsDto {
    @IsInt()
    @Type(() => Number)
    habitId: number;

    @IsString()
    @IsOptional()
    from?: string;

    @IsString()
    @IsOptional()
    to?: string;
}
