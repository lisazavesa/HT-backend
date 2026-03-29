import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitsModule } from './habits/habits.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { HabitLogsModule } from './habit-logs/habit-logs.module';

@Module({
  imports: [HabitsModule, PrismaModule, HabitLogsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
