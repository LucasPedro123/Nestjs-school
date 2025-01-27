import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class createMessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsOptional()
  readonly text: string;

  @IsPositive()
  byId: number;

  @IsPositive()
  toId: number;
}
