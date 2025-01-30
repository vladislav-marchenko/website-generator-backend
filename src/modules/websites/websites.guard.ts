import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common'
import { clusterApiUrl, Connection, Transaction } from '@solana/web3.js'

@Injectable()
export class TransactionGuard implements CanActivate {
  private connection: Connection

  constructor() {
    this.connection = new Connection('https://api.devnet.solana.com')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /*
    const request = context.switchToHttp().getRequest()
    const { publicKey, signature } = request.body

    const isValid = await this.connection.confirmTransaction(signature)
    return isValid.value.err === null
    */

    return true
  }
}
