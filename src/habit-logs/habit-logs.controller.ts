import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { HabitLogsService } from "./habit-logs.service";
import { UpsertHabitLogsDto } from "./dto/upsert-habit-logs.dto";
import { GetHabitLogsDto } from "./dto/habit-logs.dto";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";
import type { AuthUser } from "src/auth/types/auth-user.type";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";

@UseGuards(JwtAccessGuard)
@Controller("logs")
export class HabitLogsController {
    constructor(private habitLogsService: HabitLogsService) {}

    @Post()
    upsertHabitLog(
        @Body() dto: UpsertHabitLogsDto,
        @CurrentUser() user: AuthUser
    ) {
        return this.habitLogsService.upsert(dto, user.id);
    }

    @Get()
    findAll(
        @Query() dto: GetHabitLogsDto,
        @CurrentUser() user: AuthUser
    ) {
        return this.habitLogsService.getByHabitId(dto, user.id);
    }
}
