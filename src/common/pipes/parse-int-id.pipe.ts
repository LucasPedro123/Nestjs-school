import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type != 'param' && metadata.data != 'id') {
      return value;
    }
    const parsedInt = parseInt(value);
    if (isNaN(parsedInt)) {
      throw new HttpException('Valor passado inválido', HttpStatus.BAD_REQUEST);
    }
    if (parsedInt < 0) {
      throw new HttpException(
        'Valor passado tem que ser positivo',
        HttpStatus.BAD_REQUEST,
      );
    }
    return parsedInt;
  }
}
