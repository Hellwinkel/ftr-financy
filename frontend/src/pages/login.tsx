import { Lock, Mail, UserRoundPlus } from 'lucide-react'
import { type SubmitEvent, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/auth'

export function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const login = useAuthStore((state) => state.login)

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		setLoading(true)

		const toastId = toast.loading('Confirmando credenciais...')

		try {
			const isLoggedIn = await login({ email, password })

			if (isLoggedIn) {
				toast.success('Login realizado com sucesso', { id: toastId })
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Erro ao fazer login', {
				id: toastId,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card className="w-11/12 max-w-md">
			<CardHeader className="text-center items-center">
				<CardTitle render={(props) => <h1 {...props} />}>Fazer login</CardTitle>
				<CardDescription>Entre na sua conta para continuar</CardDescription>
			</CardHeader>

			<CardContent>
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
							autoComplete="current-password"
							placeholder="Digite sua senha"
							required
							icon={Lock}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled={loading}
						/>
					</Field>

					<div className="flex flex-wrap gap-4 items-center justify-between">
						<Field>
							<Checkbox id="remember" name="remember" disabled={loading} />
							<FieldLabel htmlFor="remember">Lembrar-me</FieldLabel>
						</Field>

						{/* TODO: Substituir por componente de Link a ser definido */}
						<a href="recuperar-senha" className="text-link">
							Recuperar senha
						</a>
					</div>

					<Button type="submit" className="w-full mt-2" disabled={loading}>
						Entrar
					</Button>
				</form>

				<span className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-sm text-gray-500 [&::before,&::after]:relative [&::before,&::after]:content-[''] [&::before,&::after]:block [&::before,&::after]:w-full [&::before,&::after]:h-px [&::before,&::after]:bg-gray-300">
					ou
				</span>

				<div className="flex flex-col gap-4 text-center text-sm text-gray-600">
					<p>Ainda não tem uma conta?</p>
					<Button
						variant={'outline'}
						className="w-full"
						nativeButton={false}
						render={<Link to="/cadastro" />}
					>
						<UserRoundPlus />
						Criar conta
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
