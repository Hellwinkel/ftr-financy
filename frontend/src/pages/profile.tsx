import { useMutation } from '@apollo/client/react'
import { LogOut, Mail, UserRound } from 'lucide-react'
import { type SubmitEvent, useState } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { getInitials } from '@/lib/format'
import { UPDATE_USER } from '@/lib/graphql/mutations/user'
import { useAuthStore } from '@/stores/auth'
import type { UpdateUserInput, User } from '@/types/user'

type UpdateUserMutationData = {
	updateUser: User
}

export function Profile() {
	const user = useAuthStore((state) => state.user)
	const setUser = useAuthStore((state) => state.setUser)
	const logout = useAuthStore((state) => state.logout)

	const [name, setName] = useState(user?.name ?? '')

	const [updateUser, { loading }] = useMutation<UpdateUserMutationData, { data: UpdateUserInput }>(
		UPDATE_USER
	)

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()

		const toastId = toast.loading('Salvando informações...')

		try {
			const { data } = await updateUser({
				variables: {
					data: {
						name: name.trim(),
					},
				},
			})

			if (data) {
				setUser(data.updateUser)
				toast.success('Perfil atualizado com sucesso', { id: toastId })
			}
		} catch (error) {
			// Retorna o nome do store em caso de erro
			setName(user?.name ?? '')

			toast.error(error instanceof Error ? error.message : 'Erro ao atualizar perfil', {
				id: toastId,
			})
		}
	}

	function handleLogout() {
		logout()
	}

	return (
		<>
			<h1 className="sr-only">Meu perfil</h1>

			<Card className="w-full max-w-md mx-auto" render={<form onSubmit={handleSubmit} />}>
				<CardHeader className="flex flex-col gap-0.5 items-center">
					<Avatar size="lg" className="mb-6">
						<AvatarFallback>{getInitials(user?.name ?? '')}</AvatarFallback>
					</Avatar>
					<CardTitle className="font-semibold">{user?.name}</CardTitle>
					<CardDescription className="text-gray-500">{user?.email}</CardDescription>
				</CardHeader>

				<hr className="border-gray-200" />

				<CardContent className="gap-4">
					<Field>
						<FieldLabel htmlFor="name">Nome completo</FieldLabel>
						<Input
							required
							placeholder="Seu nome completo"
							id="name"
							name="name"
							autoComplete="name"
							icon={UserRound}
							value={name}
							onChange={(event) => setName(event.target.value)}
							disabled={loading}
						/>
					</Field>

					<Field>
						<FieldLabel htmlFor="email">E-mail</FieldLabel>
						<Input
							type="email"
							placeholder="mail@exemplo.com"
							id="email"
							name="email"
							autoComplete="email"
							disabled
							defaultValue={user?.email}
							icon={Mail}
						/>
						<FieldDescription>O e-mail não pode ser alterado</FieldDescription>
					</Field>
				</CardContent>

				<CardFooter>
					<Button type="submit" disabled={loading}>
						Salvar alterações
					</Button>

					<Button variant={'destructive'} type="button" onClick={handleLogout}>
						<LogOut />
						Sair da conta
					</Button>
				</CardFooter>
			</Card>
		</>
	)
}
