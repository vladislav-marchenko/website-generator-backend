import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import * as path from 'path'
import { promises as fs } from 'fs'
import { WebsitesService } from '../websites/websites.service'

@Injectable()
export class FileService {
  private readonly uploadDir = path.resolve(__dirname, '../../../../uploads')

  constructor(
    @Inject(forwardRef(() => WebsitesService))
    private websiteService: WebsitesService,
  ) {
    fs.mkdir(this.uploadDir, { recursive: true })
  }

  async uploadFile(
    file: Express.Multer.File,
    websiteName: string,
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('File is not provided')
    }

    if (!websiteName.length) {
      throw new BadRequestException('Website name is not provided')
    }

    const websiteDir = path.join(this.uploadDir, websiteName)
    await fs.mkdir(websiteDir, { recursive: true })

    const filePath = path.join(websiteDir, file.originalname)
    await fs.writeFile(filePath, file.buffer)

    return filePath
  }

  async deleteFiles(websiteName: string, user: string) {
    const website = await this.websiteService.getWebsite(websiteName)

    if (website.creator !== user) {
      throw new UnauthorizedException()
    }

    if (!websiteName.length) {
      throw new BadRequestException('Website name is not provided')
    }

    const dirPath = path.join(this.uploadDir, websiteName)
    await fs.rm(dirPath, { recursive: true, force: true })
  }
}
