import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HozorService } from './hozor.service';
import { CreateHozorDto } from './dto/create-hozor.dto';
import { UpdateHozorDto } from './dto/update-hozor.dto';

@Controller('hozor')
export class HozorController {
  constructor(private readonly hozorService: HozorService) {}

  @Post()
  create(@Body() createHozorDto: CreateHozorDto) {
    return this.hozorService.create(createHozorDto);
  }

  @Get()
  findAll() {
    return this.hozorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hozorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHozorDto: UpdateHozorDto) {
    return this.hozorService.update(+id, updateHozorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hozorService.remove(+id);
  }
}
