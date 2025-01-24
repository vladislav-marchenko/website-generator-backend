import { Module } from '@nestjs/common'
import { WebsitesService } from './websites.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Website, WebsiteSchema } from 'schemas/website.schema'
import { WebsitesController } from './websites.controller'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Website.name, schema: WebsiteSchema }]),
  ],
  controllers: [WebsitesController],
  providers: [WebsitesService],
  exports: [WebsitesService],
})
export class WebsitesModule {}
