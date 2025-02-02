import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (origin, callback) => {
        const allowedOrigins = /^https?:\/\/(.*\.)?localhost:5173$/

        if (allowedOrigins.test(origin)) return callback(null, true)
        return callback(null, false)
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  })

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
