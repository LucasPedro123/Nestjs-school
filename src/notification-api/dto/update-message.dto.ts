import { PartialType } from '@nestjs/mapped-types';
import { createMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(createMessageDto) {}
