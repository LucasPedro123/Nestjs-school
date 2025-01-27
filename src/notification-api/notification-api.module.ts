import { Module } from '@nestjs/common';
import { NotificationApiController } from './notification-api.controller';
import { NotificationApiService } from './notification-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './Entities/message.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  controllers: [NotificationApiController],
  providers: [NotificationApiService],
})
export class NotificationApiModule {}
