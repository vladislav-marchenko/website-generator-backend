import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class NameValidationPipe implements PipeTransform {
  private readonly namePattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/

  transform(value: string) {
    const isValid = this.namePattern.test(value)

    if (!isValid) {
      throw new BadRequestException(
        'The name can be 1-63 characters long and contain letters, numbers, or hyphens (except at the beginning and end). Spaces and special characters are not allowed.',
      )
    }

    return value
  }
}
