import { Module } from '@nestjs/common';
import { NotificationApiController } from './notification-api.controller';
import { NotificationApiService } from './notification-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './Entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MyExceptionFilter } from 'src/common/filters/MyException.filter';
import { IsAdminGuard } from 'src/common/Guards/is-admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule],
  controllers: [NotificationApiController],
  providers: [
    NotificationApiService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
  ],
})
export class NotificationApiModule {}
