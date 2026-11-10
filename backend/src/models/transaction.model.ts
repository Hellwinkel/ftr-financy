import { TransactionType } from '@prisma/client'
import { GraphQLDate } from 'graphql-scalars'
import { Field, GraphQLISODateTime, ID, Int, ObjectType, registerEnumType } from 'type-graphql'
import { CategoryModel } from './category.model'

registerEnumType(TransactionType, {
	name: 'TransactionType',
	description: 'Tipo de transação financeira',
})

@ObjectType()
export class TransactionModel {
	@Field(() => ID)
	id!: string

	@Field(() => TransactionType)
	type!: TransactionType

	@Field(() => String)
	description!: string

	@Field(() => GraphQLDate)
	transactionDate!: Date

	@Field(() => Int)
	value!: number

	@Field(() => GraphQLISODateTime)
	createdAt!: Date

	@Field(() => GraphQLISODateTime)
	updatedAt!: Date

	@Field(() => String)
	categoryId!: string

	@Field(() => CategoryModel, { nullable: true })
	category?: CategoryModel
}
