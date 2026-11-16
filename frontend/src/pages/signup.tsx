import { Lock, LogIn, Mail, UserRound } from 'lucide-react'
import { type SubmitEvent, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'

export function Signup() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const signup = useAuthStore((state) => state.signup)

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		setLoading(true)

		const toastId = toast.loading('Criando sua conta...')

		try {
			const isSignedUp = await signup({ name, email, password })

			if (isSignedUp) {
				toast.success('Conta criada com sucesso!', { id: toastId })
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Falha ao criar conta', {
				id: toastId,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card className="w-11/12 max-w-md">
			<CardHeader className="text-center items-center">
				<CardTitle render={(props) => <h1 {...props} />}>Criar conta</CardTitle>
				<CardDescription>Comece a controlar suas finanças ainda hoje</CardDescription>
			</CardHeader>

			<CardContent>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<Field>
						<FieldLabel htmlFor="name">Nome completo</FieldLabel>
						<Input
							id="name"
							name="name"
							autoComplete="name"
							placeholder="Seu nome completo"
							required
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
							id="email"
							name="email"
							autoComplete="username"
							placeholder="mail@exemplo.com"
							required
							icon={Mail}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							disabled={loading}
						/>
					</Field>

					<Field>
						<FieldLabel htmlFor="password">Senha</FieldLabel>
						<Input
							type="password"
							id="password"
							name="password"
							autoComplete="new-password"
							minLength={8}
							placeholder="Digite sua senha"
							required
							icon={Lock}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled={loading}
						/>
						<FieldDescription>A senha deve ter no mínimo 8 caracteres</FieldDescription>
					</Field>

					<Button type="submit" className="w-full mt-2" disabled={loading}>
						Cadastrar
					</Button>
				</form>

				<span className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-sm text-gray-500 [&::before,&::after]:relative [&::before,&::after]:content-[''] [&::before,&::after]:block [&::before,&::after]:w-full [&::before,&::after]:h-px [&::before,&::after]:bg-gray-300">
					ou
				</span>

				<div className="flex flex-col gap-4 text-center text-sm text-gray-600">
					<p>Já tem uma conta?</p>
					<Button
						variant={'outline'}
						className="w-full"
						nativeButton={false}
						render={<Link to="/" />}
					>
						<LogIn />
						Fazer login
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
