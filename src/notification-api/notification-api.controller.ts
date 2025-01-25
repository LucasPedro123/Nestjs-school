import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NotificationApiService } from './notification-api.service';
import { createMessageDto } from './dto/create-message.dto';

@Controller('notification-api')
export class NotificationApiController {
  constructor(private readonly service: NotificationApiService) {}

  @Get('/')
  findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    console.log(id);
    return this.service.findOne(id);
  }

  @Post('')
  create(@Body() body: createMessageDto) {
    return this.service.createMessage(body);
  }

  @Patch(':id')
  updateMessage(@Param('id') id: number, @Body() body: any) {
    return this.service.updateMessage(id, body);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.service.deleteMessage(id);
  }
}
