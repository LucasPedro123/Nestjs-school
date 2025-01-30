import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class TimmingConnectionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const initialTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const finallyTime = Date.now();
        const elapsedTime = finallyTime - initialTime;
        console.log(elapsedTime, 'ms');
      }),
    );
  }
}
