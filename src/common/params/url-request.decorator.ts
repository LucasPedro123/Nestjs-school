import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UrlParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const context = ctx.switchToHttp().getRequest();
    const url: Request = context.url;

    return url;
  },
);
