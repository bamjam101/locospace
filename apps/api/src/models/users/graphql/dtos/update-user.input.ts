import { InputType, PartialType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { CreateUserInput } from './create-user.input'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  uid: User['uid']
}
