import {
  IsAlphanumeric,
  IsBoolean,
  IsInt,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class TodoDTO {
  @IsAlphanumeric()
  task: string;

  @IsBoolean()
  @IsOptional()
  completed!: string;

  @IsAlphanumeric()
  @IsOptional()
  @MaxLength(50)
  description!: string;
}

export class ParamsDTO {
  @IsInt()
  @IsOptional()
  cursor: number;

  @IsAlphanumeric()
  @IsOptional()
  search: string;
}
