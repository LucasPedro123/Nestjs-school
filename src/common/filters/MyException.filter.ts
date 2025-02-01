import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error =
      typeof response == 'string'
        ? {
            message: response,
            statusCode: statusCode,
          }
        : (exceptionResponse as object);

    response.status(statusCode).json({
      ...error,
      data: new Date().toDateString(),
    });
  }
}
