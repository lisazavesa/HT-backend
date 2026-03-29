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
} from "@nestjs/common";
import { HabitsService } from "./habits.service";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";

@Controller("habits")
export class HabitsController {
    constructor(private readonly habitsService: HabitsService) {}

    // @Query('userId', ParseIntPipe) userId: number либо убрать декоратором, либо при авторизации

    @Get()
    findAll(@Query("userId", ParseIntPipe) userId: number) {
        return this.habitsService.getAll(userId);
    }

    @Post()
    async create(
        @Body() dto: CreateHabitDto,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        return this.habitsService.create(dto, userId);
    }

    @Get(":id")
    async findOne(
        @Param("id", ParseIntPipe) id: number,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        return this.habitsService.findById(id, userId);
    }

    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateHabitDto,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        return this.habitsService.update(id, userId, dto);
    }

    @Delete(":id")
    async delete(
        @Param("id", ParseIntPipe) id: number,
        @Query("userId", ParseIntPipe) userId: number,
    ) {
        await this.habitsService.delete(id, userId);

        return { message: "Habit successfully deleted" };
    }
}
