import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { CategoryModel } from "../models/category.model";
import { isAuth } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";
import { CreateCategoryInput, UpdateCategoryInput } from "../dtos/input/category.input";
import { GQLUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma/client";
import { TransactionService } from "../services/transaction.service";

@Resolver(() => CategoryModel)
@UseMiddleware(isAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()
  private transactionService = new TransactionService()

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @GQLUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id)
  }

  @Query(() => [CategoryModel])
  async listCategories(
    @GQLUser() user: User
  ): Promise<CategoryModel[]> {
    return this.categoryService.list(user.id)
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("id", () => String) id: string,
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GQLUser() user: User
  ): Promise<CategoryModel> {
    return this.categoryService.update(id, data, user.id)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => String) id: string,
    @GQLUser() user: User
  ): Promise<boolean> {
    return this.categoryService.delete(id, user.id)
  }

  @FieldResolver(() => Int)
  async countTransactions(
    @Root() category: CategoryModel
  ): Promise<number> {
    return this.transactionService.countByCategory(category.id)
  }
}