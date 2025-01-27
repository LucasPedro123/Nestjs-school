import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Max(50)
  @Type(() => Number)
  offseat: number;
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  limit: number;
}
