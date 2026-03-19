import { Module } from '@nestjs/common';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [HabitsService, PrismaService],
  controllers: [HabitsController]
})
export class HabitsModule {}
