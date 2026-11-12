import { Lock, Mail, UserRoundPlus } from 'lucide-react'
import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Login() {
	return (
		<main className="min-h-screen bg-gray-100 py-12 flex flex-col items-center gap-8">
			<img src={logo} alt="Financy" width={134} height={32} className="h-8" />
			<Card className="w-11/12 max-w-md">
				<CardHeader className="text-center items-center">
					<CardTitle render={(props) => <h1 {...props} />}>Fazer login</CardTitle>
					<CardDescription>Entre na sua conta para continuar</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="flex flex-col gap-4">
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
							/>
						</Field>

						<div className="flex flex-wrap gap-4 items-center justify-between">
							<Field>
								<Checkbox id="remember" name="remember" />
								<FieldLabel htmlFor="remember">Lembrar-me</FieldLabel>
							</Field>

							{/* TODO: Substituir por componente de Link a ser definido */}
							<a href="recuperar-senha" className="text-link">
								Recuperar senha
							</a>
						</div>

						<Button type="submit" className="w-full mt-2">
							Entrar
						</Button>
					</form>

					<span className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center text-sm text-gray-500 [&::before,&::after]:relative [&::before,&::after]:content-[''] [&::before,&::after]:block [&::before,&::after]:w-full [&::before,&::after]:h-px [&::before,&::after]:bg-gray-300">
						ou
					</span>

					<div className="flex flex-col gap-4 text-center text-sm text-gray-600">
						<p>Ainda não tem uma conta?</p>
						<Button variant={'outline'} className="w-full">
							<UserRoundPlus />
							Criar conta
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	)
}
