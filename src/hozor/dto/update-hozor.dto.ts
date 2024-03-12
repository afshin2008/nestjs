import { PartialType } from '@nestjs/mapped-types';
import { CreateHozorDto } from './create-hozor.dto';

export class UpdateHozorDto extends PartialType(CreateHozorDto) {}
