import { Test, TestingModule } from '@nestjs/testing';
import { HozorController } from './hozor.controller';
import { HozorService } from './hozor.service';

describe('HozorController', () => {
  let controller: HozorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HozorController],
      providers: [HozorService],
    }).compile();

    controller = module.get<HozorController>(HozorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
