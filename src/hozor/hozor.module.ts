import { Module } from '@nestjs/common';
import { HozorService } from './hozor.service';
import { HozorController } from './hozor.controller';

@Module({
  controllers: [HozorController],
  providers: [HozorService],
})
export class HozorModule {}
