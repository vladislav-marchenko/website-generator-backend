import { BadRequestException } from '@nestjs/common'

export const verifyWebsiteName = (name: string) => {
  const namePattern = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/
  const isValid = namePattern.test(name)

  if (!isValid) {
    throw new BadRequestException(
      'The name can be 1-63 characters long and contain letters, numbers, or hyphens (except at the beginning and end). Spaces and special characters are not allowed.',
    )
  }
}
