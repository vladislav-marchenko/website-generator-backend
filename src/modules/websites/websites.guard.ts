import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { clusterApiUrl, Connection } from '@solana/web3.js'

@Injectable()
export class TransactionGuard implements CanActivate {
  private connection: Connection

  constructor() {
    this.connection = new Connection(
      'https://white-polished-replica.solana-mainnet.quiknode.pro/9ca678ac0e319dc8d8f694bf9c196ee8100b56eb',
    )
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
