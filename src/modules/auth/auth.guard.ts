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
    let token = this.extractTokenFromHeader(request)

    if (!token) {
      this.refreshToken(request, response)
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      })
      request['user'] = payload
    } catch {
      this.refreshToken(request, response)
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  private refreshToken(request: Request, response: Response) {
    const publicKey = request.get('Public-Key')
    if (!publicKey) throw new UnauthorizedException()

    const { generateToken } = new AuthService()
    const token = generateToken(publicKey)
    response.setHeader('Authorization', `Bearer ${token}`)
  }
}
