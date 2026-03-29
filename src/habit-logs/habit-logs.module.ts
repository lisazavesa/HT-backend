import { Module } from '@nestjs/common';
import { HabitLogsService } from './habit-logs.service';
import { HabitLogsController } from './habit-logs.controller';

@Module({
  providers: [HabitLogsService],
  controllers: [HabitLogsController]
})
export class HabitLogsModule {}
