import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { HabitLogsService } from "./habit-logs.service";
import { UpsertHabitLogsDto } from "./dto/upsert-habit-logs.dto";
import { GetHabitLogsDto } from "./dto/habit-logs.dto";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";
import type { AuthUser } from "src/auth/types/auth-user.type";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { DeleteLogDto } from "./dto/delete-log-dto";

@ApiTags("Logs")
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller("logs")
export class HabitLogsController {
    constructor(private habitLogsService: HabitLogsService) {}

    @Post()
    @ApiOperation({ summary: "Create or update habit log" })
    upsertHabitLog(
        @Body() dto: UpsertHabitLogsDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.habitLogsService.upsert(dto, user.id);
    }

    @Get()
    @ApiOperation({ summary: "Get habit logs by habitId" })
    findAll(@Query() dto: GetHabitLogsDto, @CurrentUser() user: AuthUser) {
        return this.habitLogsService.getByHabitId(dto, user.id);
    }

    @Delete(":habitId/:date")
    @ApiOperation({ summary: "Delete log by date" })
    deleteLog(
        @Param("habitId", ParseIntPipe) habitId: number,
        @Param("date") date: string,
        @CurrentUser() user: AuthUser,
    ) {
        return this.habitLogsService.deleteLogByDate(
            {
                habitId,
                date,
            },
            user.id,
        );
    }
}
