import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateWebsiteDto, UpdateWebsiteDto } from './websites.dto'
import { WebsitesService } from './websites.service'
import { AuthGuard } from '../auth/auth.guard'
import { Request } from 'express'

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createWebsite(
    @Body() { name, data }: CreateWebsiteDto,
    @Req() request: { user: string } & Request,
  ) {
    return this.websitesService.createWebsite({
      name,
      data,
      creator: request.user,
    })
  }

  @Get(':name')
  getWebsite(@Param('name') name: string) {
    return this.websitesService.getWebsite(name)
  }

  @UseGuards(AuthGuard)
  @Get()
  getUserWebsites(
    @Query('limit') limit: number = null,
    @Req() request: { user: string } & Request,
  ) {
    return this.websitesService.getUserWebsites(request.user, limit)
  }

  @UseGuards(AuthGuard)
  @Put('update/:name')
  updateWebsite(
    @Param('name') name: string,
    @Body() payload: UpdateWebsiteDto,
    @Req() request: { user: string } & Request,
  ) {
    return this.websitesService.updateWebsite(name, request.user, payload)
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':name')
  deleteWebsite(
    @Param('name') name: string,
    @Req() request: { user: string } & Request,
  ) {
    return this.websitesService.deleteWebsite(name, request.user)
  }
}
