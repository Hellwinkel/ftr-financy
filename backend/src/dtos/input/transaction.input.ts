import { TransactionType } from '@prisma/client'
import { GraphQLDate } from 'graphql-scalars'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class CreateTransactionInput {
	@Field(() => TransactionType)
	type!: TransactionType

	@Field(() => String)
	description!: string

	@Field(() => GraphQLDate)
	transactionDate!: Date

	@Field(() => Int)
	value!: number

	@Field(() => String)
	categoryId!: string
}

@InputType()
export class UpdateTransactionInput {
	@Field(() => TransactionType, { nullable: true })
	type?: TransactionType

	@Field(() => String, { nullable: true })
	description?: string

	@Field(() => GraphQLDate, { nullable: true })
	transactionDate?: Date

	@Field(() => Int, { nullable: true })
	value?: number

	@Field(() => String, { nullable: true })
	categoryId?: string
}
