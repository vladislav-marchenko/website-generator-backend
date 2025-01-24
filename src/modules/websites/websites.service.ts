import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Website } from 'schemas/website.schema'
import { CreateWebsiteDto } from './websites.dto'

@Injectable()
export class WebsitesService {
  constructor(
    @InjectModel(Website.name) private websiteModel: Model<Website>,
  ) {}

  async createWebsite({
    name,
    data,
    creator,
  }: { creator: string } & CreateWebsiteDto) {
    try {
      const createdWebsite = new this.websiteModel({ name, data, creator })
      return await createdWebsite.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Name already exists')
      }

      throw new Error('An error occurred while creating the website')
    }
  }

  async getWebsite(name: string) {
    const website = await this.websiteModel.findOne({ name }).exec()

    if (!website) {
      throw new NotFoundException(`Website with name "${name}" not found`)
    }

    return website
  }

  async getUserWebsites(userId: string, limit: number | null = null) {
    try {
      const websites = await this.websiteModel
        .find({ creator: userId })
        .limit(limit)
        .exec()

      if (!websites.length) {
        throw new NotFoundException(
          `No websites found for user with ID "${userId}"`,
        )
      }

      return websites
    } catch (error) {
      if (error.path === 'limit') {
        throw new BadRequestException('Invalid limit param')
      }

      throw new Error('An error occurred')
    }
  }

  async deleteWebsite(name: string) {
    const { deletedCount } = await this.websiteModel.deleteOne({ name }).exec()

    if (deletedCount === 0) {
      throw new NotFoundException(`Website with name "${name}" not found`)
    }
  }
}
