import {
  IsNotEmpty,
  IsOptional,
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

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsOptional()
  readonly by: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  @IsOptional()
  readonly to: string;
}
