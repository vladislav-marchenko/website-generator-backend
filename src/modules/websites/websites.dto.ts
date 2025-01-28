import {
  IsString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  Matches,
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
  @Matches(/^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/, {
    message:
      'The name can be 1-63 characters long and contain letters, numbers, or hyphens (except at the beginning and end). Spaces and special characters are not allowed.',
  })
  name: string

  @IsOptional()
  @IsNotEmptyObject()
  data: object
}
