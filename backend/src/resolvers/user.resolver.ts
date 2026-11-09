import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { isAuth } from "../middlewares/auth.middleware";
import { GQLUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { UpdateUserInput } from "../dtos/input/user.input";

@Resolver(() => UserModel)
@UseMiddleware(isAuth)
export class UserResolver {
  private userService = new UserService()

  @Query (() => UserModel)
  async me(
    @GQLUser() user: User
  ): Promise<UserModel> {
    return user
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @GQLUser() user: User
  ): Promise<UserModel> {
    return this.userService.updateUser(user.id, data)
  }
}