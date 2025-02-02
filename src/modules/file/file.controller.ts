import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
  UploadedFiles,
  HttpCode,
} from '@nestjs/common'
import { FileService } from './file.service'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard'
import { Request } from 'express'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(201)
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() { name }: { name: string },
  ) {
    return this.fileService.uploadFiles(files, name)
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteFile(
    @Body('websiteName') websiteName: string,
    @Req() request: { user: string } & Request,
  ) {
    return this.fileService.deleteFiles(websiteName, request.user)
  }
}
