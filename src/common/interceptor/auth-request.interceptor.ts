import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthRequestInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers?.authorization?.split(' ')[1];

    if (!token || token != '123456') {
      throw new UnauthorizedException('Invalid token');
    }

    return next.handle();
  }
}
