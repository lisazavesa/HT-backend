import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { AuthUser } from "src/auth/types/auth-user.type";
import { ApiTags } from "@nestjs/swagger";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";
import { GetStatsDto } from "./dto/get-stats.dto";

@ApiTags("Stats")
@UseGuards(JwtAccessGuard)
@Controller("stats")
export class StatsController {
    constructor(private statsService: StatsService) {}

    @Get()
    getStats(
        @Query() dto: GetStatsDto, 
        @CurrentUser() user: AuthUser
    ) {
        return this.statsService.getHabitStats(dto, user.id);
    }
}
