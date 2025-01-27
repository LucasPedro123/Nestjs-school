import { Module } from '@nestjs/common';
import { NotificationApiModule } from './notification-api/notification-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

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
export class AppModule {}
