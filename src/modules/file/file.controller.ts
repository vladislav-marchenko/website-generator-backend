import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseInterceptors,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard'
import { Request } from 'express'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() { websiteName }: { websiteName: string },
  ) {
    return this.fileService.uploadFile(file, websiteName)
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
