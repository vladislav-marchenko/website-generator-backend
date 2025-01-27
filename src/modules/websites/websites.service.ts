import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Website } from 'schemas/website.schema'
import { UpdateWebsiteDto } from './websites.dto'
import { FileService } from '../file/file.service'

@Injectable()
export class WebsitesService {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<Website>,
    @Inject(forwardRef(() => FileService)) private fileService: FileService,
  ) {}

  async createWebsite(
    name: string,
    template: string,
    data: object,
    user: string,
  ) {
    try {
      const createdWebsite = new this.websiteModel({
        name,
        template,
        data,
        creator: user,
      })
      return await createdWebsite.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Name already exists')
      }

      console.log(error)
      throw new Error('An error occurred while creating the website')
    }
  }

  async getWebsite(name: string): Promise<Website> {
    const website = await this.websiteModel.findOne({ name }).exec()

    if (!website) {
      throw new NotFoundException(`Website with name "${name}" not found`)
    }

    return website
  }

  async getUserWebsites(user: string, limit: number | null = null) {
    const websites = await this.websiteModel
      .find({ creator: user })
      .limit(limit)
      .exec()

    return websites
  }

  async updateWebsite(name: string, user: string, payload: UpdateWebsiteDto) {
    const website = await this.websiteModel.findOne({ name }).exec()

    if (payload.name) {
      const isAlreadyExist = await this.websiteModel
        .exists({ name: payload.name })
        .exec()
      if (isAlreadyExist) throw new ConflictException('The name already exists')
    }

    if (!website) {
      throw new NotFoundException(`Website with name "${name}" not found`)
    }

    if (website.creator !== user) {
      throw new UnauthorizedException()
    }

    Object.assign(website, payload)
    await website.save()

    return website
  }

  async deleteWebsite(name: string, user: string) {
    const website = await this.websiteModel.findOne({ name }).exec()

    if (!website) {
      throw new NotFoundException(`Website with name "${name}" not found`)
    }

    if (website.creator !== user) {
      throw new UnauthorizedException()
    }

    await this.fileService.deleteFiles(name, user)
    await this.websiteModel.deleteOne({ name }).exec()
  }
}
