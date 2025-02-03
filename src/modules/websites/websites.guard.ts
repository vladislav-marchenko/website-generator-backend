import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Connection } from '@solana/web3.js'

type RequestBody = {
  signature: string
  transaction: string
}

@Injectable()
export class TransactionGuard implements CanActivate {
  private connection: Connection

  constructor() {
    this.connection = new Connection('https://api.devnet.solana.com')
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ body: RequestBody }>()
    const { signature } = request.body

    try {
      await this.connection.getTransaction(signature, {
        commitment: 'confirmed',
      })
    } catch {
      throw new NotFoundException('Transaction not found')
    }

    return true
  }
}
