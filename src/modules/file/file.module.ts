import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { WebsitesModule } from '../websites/websites.module'

@Module({
  imports: [WebsitesModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
