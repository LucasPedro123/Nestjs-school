import { Module } from '@nestjs/common';
import { NotificationApiController } from './notification-api.controller';
import { NotificationApiService } from './notification-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './Entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [NotificationApiController],
  providers: [NotificationApiService],
})
export class NotificationApiModule {}
