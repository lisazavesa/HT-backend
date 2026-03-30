import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const email = dto.email.toLowerCase().trim();

        const existing = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existing) {
            throw new BadRequestException("User already exists");
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
            },
        });
    }

    findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
            },
        });
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const data: Prisma.UserUpdateInput = {};

        if (dto.email) {
            const exists = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });

            if (exists && exists.id !== id) {
                throw new BadRequestException("Email already in use");
            }
        }

        if (dto.password) {
            data.passwordHash = await bcrypt.hash(dto.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
            },
        });
    }
}
