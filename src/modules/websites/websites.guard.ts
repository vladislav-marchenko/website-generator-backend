import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Connection } from '@solana/web3.js'

@Injectable()
export class TransactionGuard implements CanActivate {
  private connection: Connection

  constructor() {
    this.connection = new Connection('https://api.devnet.solana.com')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ body: { signature: string } }>()

    try {
      const { signature } = request.body

      await this.connection.getParsedTransaction(signature, {
        commitment: 'confirmed',
      })
    } catch {
      throw new NotFoundException('Transaction not found')
    }

    return true
  }
}
