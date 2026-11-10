import type { User } from '@prisma/client'
import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UpdateUserInput } from '../dtos/input/user.input'
import { GQLUser } from '../graphql/decorators/user.decorator'
import { isAuth } from '../middlewares/auth.middleware'
import { UserModel } from '../models/user.model'
import { UserService } from '../services/user.service'

@Resolver(() => UserModel)
@UseMiddleware(isAuth)
export class UserResolver {
	private userService = new UserService()

	@Query(() => UserModel)
	async me(@GQLUser() user: User): Promise<UserModel> {
		return user
	}

	@Mutation(() => UserModel)
	async updateUser(
		@Arg('data', () => UpdateUserInput) data: UpdateUserInput,
		@GQLUser() user: User
	): Promise<UserModel> {
		return this.userService.updateUser(user.id, data)
	}
}
