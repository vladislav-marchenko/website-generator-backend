import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator'

export class CreateWebsiteDto {
  @IsNotEmptyObject()
  data: object

  @IsString()
  @IsNotEmpty()
  template: string
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
