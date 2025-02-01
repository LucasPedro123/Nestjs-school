import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NotificationApiModule } from './notification-api/notification-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SimpleMiddleware } from './common/middleware/simple.middleware';

@Module({
  imports: [
    NotificationApiModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'luc4s123',
      database: 'postgres',
      autoLoadEntities: true, //carega entidade sem precisar especificar
      synchronize: true, //sincroniza as tabelas com o banco
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
