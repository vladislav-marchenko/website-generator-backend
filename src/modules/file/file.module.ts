import { forwardRef, Module } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { WebsitesModule } from '../websites/websites.module'

@Module({
  imports: [forwardRef(() => WebsitesModule)],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
