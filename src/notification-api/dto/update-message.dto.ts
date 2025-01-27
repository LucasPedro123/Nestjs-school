import { PartialType } from '@nestjs/mapped-types';
import { createMessageDto } from './create-message.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateMessageDto extends PartialType(createMessageDto) {
  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
