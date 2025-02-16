import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { NotificationApiService } from './notification-api.service';
import { createMessageDto } from './dto/create-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { AuthRequestInterceptor } from 'src/common/interceptor/auth-request.interceptor';
import { UrlParam } from 'src/common/params/url-request.decorator';
import { AuthTokenGuard } from 'src/auth/guard/auth.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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

  @UseGuards(AuthTokenGuard)
  @Post('')
  create(
    @Body() body: createMessageDto,
    @TokenPayloadParam() TokenPayload: TokenPayloadDto,
  ) {
    return this.service.createMessage(body, TokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  updateMessage(
    @Param('id') id: number,
    @Body() body: UpdateMessageDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.service.updateMessage(id, body, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  deleteMessage(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.service.deleteMessage(id, tokenPayload);
  }
}
