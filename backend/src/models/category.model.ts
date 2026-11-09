import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryModel {

  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String)
  icon!: string

  @Field(() => String)
  color!: string

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date

  @Field(() => Int, { nullable: true })
  countTransactions?: number
}