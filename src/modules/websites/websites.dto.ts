import { IsString, IsNotEmpty, IsNotEmptyObject } from 'class-validator'

export class CreateWebsiteDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmptyObject()
  data: object
}
