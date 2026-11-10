import type { User } from '@prisma/client'
import { createParameterDecorator, type ResolverData } from 'type-graphql'
import { prismaClient } from '../../../prisma/prisma'
import type { GraphqlContext } from '../context'

export function GQLUser() {
	return createParameterDecorator(
		async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
			if (!context?.user) {
				return null
			}

			try {
				const user = await prismaClient.user.findUnique({
					where: {
						id: context.user,
					},
				})

				if (!user) {
					throw new Error('Usuário não encontrado')
				}

				return user
			} catch (error) {
				console.error('Erro ao instanciar o GQLUser', error)

				return null
			}
		}
	)
}
