import { IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(32, 32, { message: 'The public key must be 32 characters long' })
  publicKey: string
}
