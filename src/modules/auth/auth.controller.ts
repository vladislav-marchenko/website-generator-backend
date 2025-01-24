import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  generateToken(@Body() { publicKey }: AuthDto, @Res() response: Response) {
    const token = this.authService.generateToken(publicKey)
    response.setHeader('Authorization', `Bearer ${token}`)

    return response.json({ token })
  }
}
