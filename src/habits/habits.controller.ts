import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";

import { HabitsService } from "./habits.service";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";

import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import type { AuthUser } from "src/auth/types/auth-user.type";
import { JwtAccessGuard } from "src/auth/guards/jwt-access.guard";

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Habits")
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller("habits")
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) {}

    // GET ALL
    @Get()
    @ApiOperation({ summary: "Get all habits of current user" })
    @ApiResponse({ status: 200 })
    findAll(@CurrentUser() user: AuthUser) {
        return this.habitsService.getAll(user.id);
    }

    // CREATE
    @Post()
    @ApiOperation({ summary: "Create habit" })
    @ApiResponse({ status: 201 })
    create(@Body() dto: CreateHabitDto, @CurrentUser() user: AuthUser) {
        return this.habitsService.create(dto, user.id);
    }

    // GET ONE
    @Get(":id")
    @ApiOperation({ summary: "Get habit by id" })
    @ApiResponse({ status: 200 })
    findOne(
        @Param("id", ParseIntPipe) id: number,
        @CurrentUser() user: AuthUser,
    ) {
        return this.habitsService.findById(id, user.id);
    }

    // UPDATE
    @Patch(":id")
    @ApiOperation({ summary: "Update habit" })
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.habitsService.update(id, user.id, dto);
    }

    // DELETE
    @Delete(":id")
    @ApiOperation({ summary: "Delete habit" })
    delete(
        @Param("id", ParseIntPipe) id: number,
        @CurrentUser() user: AuthUser,
    ) {
        return this.habitsService.delete(id, user.id);
    }
}
