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

  async uploadFiles(
    files: Express.Multer.File[],
    websiteName: string,
  ): Promise<void> {
    if (!files.length) {
      throw new BadRequestException('Files are not provided')
    }

    if (!websiteName.length) {
      throw new BadRequestException('Website name is not provided')
    }

    const websiteDir = path.join(this.uploadDir, websiteName)
    await fs.mkdir(websiteDir, { recursive: true })

    for (const file of files) {
      const extension = path.extname(file.originalname)
      const filePath = path.join(websiteDir, file.fieldname + extension)
      await fs.writeFile(filePath, file.buffer)
    }
  }

  async deleteFiles(websiteName: string, user: string) {
    const website = await this.websiteService.getWebsite({
      name: websiteName,
      includeCreator: true,
    })

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
