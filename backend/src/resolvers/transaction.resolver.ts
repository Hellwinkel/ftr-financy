import type { User } from '@prisma/client'
import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql'
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input'
import { GQLUser } from '../graphql/decorators/user.decorator'
import { isAuth } from '../middlewares/auth.middleware'
import { CategoryModel } from '../models/category.model'
import { TransactionModel } from '../models/transaction.model'
import { CategoryService } from '../services/category.service'
import { TransactionService } from '../services/transaction.service'

@Resolver(() => TransactionModel)
@UseMiddleware(isAuth)
export class TransactionResolver {
	private transactionService = new TransactionService()
	private categoryService = new CategoryService()

	@Mutation(() => TransactionModel)
	async createTransaction(
		@Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
		@GQLUser() user: User
	): Promise<TransactionModel> {
		return this.transactionService.create(data, user.id)
	}

	@Query(() => [TransactionModel])
	async listTransactions(@GQLUser() user: User): Promise<TransactionModel[]> {
		return this.transactionService.list(user.id)
	}

	@Mutation(() => TransactionModel)
	async updateTransaction(
		@Arg('id', () => String) id: string,
		@Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
		@GQLUser() user: User
	): Promise<TransactionModel> {
		return this.transactionService.update(id, data, user.id)
	}

	@Mutation(() => Boolean)
	async deleteTransaction(
		@Arg('id', () => String) id: string,
		@GQLUser() user: User
	): Promise<boolean> {
		return this.transactionService.delete(id, user.id)
	}

	@FieldResolver(() => CategoryModel)
	async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
		return this.categoryService.findById(transaction.categoryId)
	}
}
