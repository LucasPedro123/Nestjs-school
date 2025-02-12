import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TOKEN_PAYLOAD_KEY } from '../constants/payload.constant';

export const TokenPayloadParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp();
    const request: Request = context.getRequest();
    return request[TOKEN_PAYLOAD_KEY];
  },
);
