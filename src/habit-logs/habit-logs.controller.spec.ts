import { Test, TestingModule } from '@nestjs/testing';
import { HabitLogsController } from './habit-logs.controller';

describe('HabitLogsController', () => {
  let controller: HabitLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitLogsController],
    }).compile();

    controller = module.get<HabitLogsController>(HabitLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
