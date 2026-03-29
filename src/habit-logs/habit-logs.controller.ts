import {
    Body,
    Controller,
    Get,
    ParseIntPipe,
    Post,
    Query,
} from "@nestjs/common";
import { HabitLogsService } from "./habit-logs.service";
import { UpsertHabitLogsDto } from "./dto/upsert-habit-logs.dto";
import { GetHabitLogsDto } from "./dto/habit-logs.dto";

@Controller("logs")
export class HabitLogsController {
    constructor(private habitLogsService: HabitLogsService) {}

    @Post()
    upsertHabitLog(
        @Body() dto: UpsertHabitLogsDto,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        return this.habitLogsService.upsert(dto, userId);
    }

    @Get()
    findAll(
        @Query() dto: GetHabitLogsDto,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        return this.habitLogsService.getByHabitId(dto, userId);
    }
}
