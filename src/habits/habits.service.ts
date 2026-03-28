import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHabitDto } from "./dto/create-habit.dto";
import { UpdateHabitDto } from "./dto/update-habit.dto";

@Injectable()
export class HabitsService {
    constructor(private readonly prisma: PrismaService) {}

    getAll(userId: number) {
        return this.prisma.habit.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    }

    async create(dto: CreateHabitDto, userId: number) {
        // const user = await this.prisma.user.findUnique({
        //     where: { id: userId },
        // });

        // if (!user) {
        //     throw new NotFoundException('User not found');
        // }

        return this.prisma.habit.create({
            data: {
                ...dto,
                user: {
                    connect: { id: userId },
                },
            },
        });
    }

    async findById(id: number, userId: number) {
        const habit = await this.prisma.habit.findFirst({
            where: {
                id,
                userId,
            },
        });

        if (!habit) {
            throw new NotFoundException("Habit not found");
        }

        return habit;
    }

    async update(id: number, userId: number, dto: UpdateHabitDto) {
        const result = await this.prisma.habit.updateMany({
            where: { id, userId },
            data: dto,
        });

        if (result.count === 0) {
            throw new NotFoundException("Habit not found");
        }

        return this.findById(id, userId);
    }

    async delete(id: number, userId: number) {
        const result = await this.prisma.habit.deleteMany({
            where: { id, userId },
        });

        if (result.count === 0) {
            throw new NotFoundException("Habit not found");
        }
    }
}
