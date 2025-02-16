import { Module } from '@nestjs/common';
import { NotificationApiController } from './notification-api.controller';
import { NotificationApiService } from './notification-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './Entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { MyExceptionFilter } from 'src/common/filters/MyException.filter';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    UsersModule,
    AuthModule,
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [NotificationApiController],
  providers: [
    NotificationApiService,
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class NotificationApiModule {}
