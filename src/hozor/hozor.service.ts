import { Injectable } from '@nestjs/common';
import { CreateHozorDto } from './dto/create-hozor.dto';
import { UpdateHozorDto } from './dto/update-hozor.dto';

@Injectable()
export class HozorService {
  create(createHozorDto: CreateHozorDto) {
    return 'This action adds a new hozor';
  }

  findAll() {
    return `This action returns all hozor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hozor`;
  }

  update(id: number, updateHozorDto: UpdateHozorDto) {
    return `This action updates a #${id} hozor`;
  }

  remove(id: number) {
    return `This action removes a #${id} hozor`;
  }
}
