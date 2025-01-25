import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator'

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmptyObject()
  data: object
}

export class UpdateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsOptional()
  @IsNotEmptyObject()
  data: object
}
