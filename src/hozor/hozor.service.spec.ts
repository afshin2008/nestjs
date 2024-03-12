import { Test, TestingModule } from '@nestjs/testing';
import { HozorService } from './hozor.service';

describe('HozorService', () => {
  let service: HozorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HozorService],
    }).compile();

    service = module.get<HozorService>(HozorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
