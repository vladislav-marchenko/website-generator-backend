import { forwardRef, Module } from '@nestjs/common'
import { WebsitesService } from './websites.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Website, WebsiteSchema } from 'schemas/website.schema'
import { WebsitesController } from './websites.controller'
import { FileModule } from '../file/file.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Website.name, schema: WebsiteSchema }]),
    forwardRef(() => FileModule),
  ],
  controllers: [WebsitesController],
  providers: [WebsitesService],
  exports: [WebsitesService],
})
export class WebsitesModule {}
