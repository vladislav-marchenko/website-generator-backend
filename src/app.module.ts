import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WebsitesModule } from './modules/websites/websites.module'
import { AuthModule } from './modules/auth/auth.module'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.saufa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    WebsitesModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
