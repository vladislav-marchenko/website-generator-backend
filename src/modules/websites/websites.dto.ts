import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator'

export class CreateWebsiteDto {
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
