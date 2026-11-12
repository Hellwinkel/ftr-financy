import { LogOut, Mail, UserRound } from 'lucide-react'
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

export function Profile() {
	return (
		<>
			<h1 className="sr-only">Meu perfil</h1>

			<Card className="w-full max-w-md mx-auto" render={<form />}>
				<CardHeader className="flex flex-col items-center">
					<Avatar size="lg" className="mb-5">
						<AvatarFallback>CT</AvatarFallback>
					</Avatar>
					<CardTitle className="font-semibold">Conta teste</CardTitle>
					<CardDescription className="text-gray-500">conta@teste.com</CardDescription>
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
							defaultValue="Conta teste"
							icon={UserRound}
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
							defaultValue="conta@teste.com"
							icon={Mail}
						/>
						<FieldDescription>O e-mail não pode ser alterado</FieldDescription>
					</Field>
				</CardContent>

				<CardFooter>
					<Button type="submit">Salvar alterações</Button>
					<Button variant={'destructive'} type="button">
						<LogOut />
						Sair da conta
					</Button>
				</CardFooter>
			</Card>
		</>
	)
}
