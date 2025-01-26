import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type WebsiteDocument = HydratedDocument<Website>

@Schema()
export class Website {
  @Prop({ unique: true, required: true })
  name: string

  @Prop({ required: true })
  template: string

  @Prop({ type: Object, required: true })
  data: object

  @Prop({ required: true, length: 32 })
  creator: string
}

export const WebsiteSchema = SchemaFactory.createForClass(Website)
