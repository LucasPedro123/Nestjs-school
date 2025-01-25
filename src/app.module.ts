import { Module } from '@nestjs/common';
import { NotificationApiModule } from './notification-api/notification-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
