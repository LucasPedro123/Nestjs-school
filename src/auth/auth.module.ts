import { Global, Module } from '@nestjs/common';
import { BcryptService } from './hashing/bcypt.service';
import { HashingService } from './hashing/hashing.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import JwtConfig from './config/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthTokenGuard } from './guard/auth.guard';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(JwtConfig),
    JwtModule.registerAsync(JwtConfig.asProvider()),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
    JwtService,
    AuthTokenGuard,
  ],
  exports: [HashingService, JwtService, JwtModule, AuthService, AuthTokenGuard],
  controllers: [AuthController],
})
export class AuthModule {}
