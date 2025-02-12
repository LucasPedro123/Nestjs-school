import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { TOKEN_PAYLOAD_KEY } from '../constants/payload.constant';

export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Not authorized - Token not found');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtConfiguration.secret,
      });
      request[TOKEN_PAYLOAD_KEY] = payload;
      console.log(payload);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token', err);
    }
  }

  extractTokenFromHeader(req: Request): string | undefined {
    const authorization = req.headers?.authorization;
    if (!authorization) {
      return undefined;
    }
    const token = authorization.split(' ')[1];
    return token;
  }
}
