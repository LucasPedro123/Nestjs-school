import { Module } from '@nestjs/common';
import { NotificationApiModule } from './notification-api/notification-api.module';

@Module({
  imports: [NotificationApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
