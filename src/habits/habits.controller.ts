import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { HabitsService } from "./habits.service";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { AuthUser } from "src/auth/types/auth-user.type";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";

@UseGuards(JwtAccessGuard)
@Controller("habits")
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) {}

    @Get()
    findAll(@CurrentUser() user: AuthUser) {
        return this.habitsService.getAll(user.id);
    }

    @Post()
    async create(
        @Body() dto: CreateHabitDto,
        @CurrentUser() user: AuthUser
    ) {
        return this.habitsService.create(dto, user.id);
    }

    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @CurrentUser() user: AuthUser
    ) {
        return this.habitsService.findById(id, user.id);
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
        @CurrentUser() user: AuthUser
    ) {
        return this.habitsService.update(id, user.id, dto);
    }

    @Delete(":id")
    async delete(
        @Param("id", ParseIntPipe) id: number,
        @CurrentUser() user: AuthUser
    ) {
        await this.habitsService.delete(id, user.id);

        return { message: "Habit successfully deleted" };
    }
}
