import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { GetStatsDto } from "./dto/get-stats.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class StatsService {
    constructor(private prisma: PrismaService) {}

    async getHabitStats(dto: GetStatsDto, userId: number) {
        const habit = await this.prisma.habit.findFirst({
            where: { id: dto.habitId, userId },
        });

        if (!habit) {
            throw new NotFoundException("Habit not found");
        }

        const where: Prisma.HabitLogWhereInput = {
            habitId: dto.habitId,
        };

        if (dto.from || dto.to) {
            where.date = {};

            if (dto.from) {
                where.date.gte = new Date(dto.from);
            }

            if (dto.to) {
                where.date.lte = new Date(dto.to);
            }
        }

        const logs = await this.prisma.habitLog.findMany({
            where,
            orderBy: { date: "asc" },
        });

        // ОСНОВНАЯ СТАТИСТИКА

        const doneDays = logs.filter((l) => l.status === "done").length;
        const totalDays = logs.length;
        const missedDays = logs.filter((l) => l.status === "missed").length;

        const completionRate =
            totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100);

        // СЕРИЯ ВЫПОЛНЕНИЯ

        let currentStreak = 0;
        let maxStreak = 0;
        let tempStreak = 0;

        for (const log of logs) {
            if (log.status === "done") {
                tempStreak++;
                maxStreak = Math.max(maxStreak, tempStreak);
            } else {
                tempStreak = 0;
            }
        }

        for (let i = logs.length - 1; i >= 0; i--) {
            if (logs[i].status === "done") {
                currentStreak++;
            } else {
                break;
            }
        }

        // СТАТИСТИКА ПО ДНЯМ НЕДЕЛИ

        const weekStats = {
            0: 0, // Sun
            1: 0, // Mon
            2: 0, // Tue
            3: 0, // Wed
            4: 0, // Thu
            5: 0, // Fri
            6: 0, // Sat
        };

        logs.forEach((log) => {
            if (log.status === "done") {
                const day = new Date(log.date).getDay();
                weekStats[day]++;
            }
        });

        return {
            totalDays,
            doneDays,
            missedDays,
            completionRate,

            currentStreak,
            maxStreak,

            weekStats,
        };
    }
}
