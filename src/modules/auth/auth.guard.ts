import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const token = this.extractTokenFromCookies(request)

    if (!token) {
      this.refreshToken(request, response)
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      })
      request['user'] = payload
    } catch {
      const payload = this.refreshToken(request, response)
      request['user'] = payload
    }

    return true
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request.cookies?.token || null
  }

  private refreshToken(request: Request, response: Response) {
    const publicKey = request.get('Public-Key')
    if (!publicKey) throw new UnauthorizedException()

    const { generateToken } = new AuthService()
    const token = generateToken(publicKey)

    response.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    })

    return publicKey
  }
}
