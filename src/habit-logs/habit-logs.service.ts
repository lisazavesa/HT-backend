import { Injectable, NotFoundException } from "@nestjs/common";
import { HabitStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { GetHabitLogsDto } from "./dto/habit-logs.dto";
import { UpsertHabitLogsDto } from "./dto/upsert-habit-logs.dto";

@Injectable()
export class HabitLogsService {
    constructor(private readonly prisma: PrismaService) {}

    async upsert(dto: UpsertHabitLogsDto, userId: number) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id: dto.habitId,
                userId,
            },
        });

        if (!habit) {
            throw new NotFoundException("Habit not found");
        }

        const parsedDate = new Date(dto.date);

        return this.prisma.habitLog.upsert({
            where: {
                habitId_date: {
                    habitId: dto.habitId,
                    date: parsedDate,
                },
            },
            update: {
                status: dto.status,
            },
            create: {
                habitId: dto.habitId,
                date: parsedDate,
                status: dto.status,
            },
        });
    }

    async getByHabitId(dto: GetHabitLogsDto, userId: number) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id: dto.habitId,
                userId,
            },
        });

        if (!habit) {
            throw new NotFoundException("Habit not found");
        }

        const where: Prisma.HabitLogWhereInput = {
            habitId: dto.habitId,
        };

        if (dto.from || dto.to) {
            where.date = {
                ...(dto.from ? { gte: new Date(dto.from) } : {}),
                ...(dto.to ? { lte: new Date(dto.to) } : {}),
            };
        }

        return this.prisma.habitLog.findMany({
            where,
            orderBy: { date: "asc" },
        });
    }
}
