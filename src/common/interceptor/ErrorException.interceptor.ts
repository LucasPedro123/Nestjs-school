import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

export class ErrorExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(err => {
        return throwError(() => {
          if (err instanceof NotFoundException) {
            return new BadRequestException('Venho daqui: ' + err.message);
          }
          return new BadRequestException(
            'Erro desconhecido ocorreu no Servidor.',
          );
        });
      }),
    );
  }
}
