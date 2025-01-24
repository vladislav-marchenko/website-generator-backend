import { Injectable } from '@nestjs/common'
import { sign } from 'jsonwebtoken'

@Injectable()
export class AuthService {
  generateToken(publicKey: string) {
    return sign(publicKey, process.env.SECRET)
  }
}
