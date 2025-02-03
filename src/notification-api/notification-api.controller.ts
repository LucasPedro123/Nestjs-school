import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { NotificationApiService } from './notification-api.service';
import { createMessageDto } from './dto/create-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AuthRequestInterceptor } from 'src/common/interceptor/auth-request.interceptor';
import { UrlParam } from 'src/common/params/url-request.decorator';

@Controller('notification-api')
@UsePipes(ParseIntIdPipe)
@UseInterceptors(AuthRequestInterceptor)
export class NotificationApiController {
  constructor(private readonly service: NotificationApiService) {}

  @Get('/')
  @UsePipes(ParseIntIdPipe)
  findAll(@Query() pagination: PaginationDto, @UrlParam() url: string) {
    console.log(url);
    return this.service.findAll(pagination);
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
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
