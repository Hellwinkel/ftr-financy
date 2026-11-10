import type { User } from '@prisma/client'
import { prismaClient } from '../../prisma/prisma'
import type { LoginInput, RegisterInput } from '../dtos/input/auth.input'
import { comparePassword, hashPassword } from '../utils/hash'
import { signJwt } from '../utils/jwt'

export class AuthService {
	async register(data: RegisterInput) {
		const { name, email, password } = data

		if (password.length < 8) {
			throw new Error('A senha deve conter pelo menos 8 caracteres')
		}

		const existingUser = await prismaClient.user.findUnique({
			where: {
				email,
			},
		})

		if (existingUser) {
			throw new Error('E-mail já cadastrado')
		}

		const hash = await hashPassword(password)

		const user = await prismaClient.user.create({
			data: {
				name,
				email,
				password: hash,
			},
		})

		return this.generateToken(user)
	}

	generateToken(user: User) {
		const { id, email } = user

		const token = signJwt({ id, email }, '1d')

		return { token, user }
	}

	async login(data: LoginInput) {
		const { email, password } = data

		const existingUser = await prismaClient.user.findUnique({
			where: {
				email,
			},
		})

		if (!existingUser) {
			throw new Error('Credenciais inválidas')
		}

		const compare = await comparePassword(password, existingUser.password)

		if (!compare) {
			throw new Error('Credenciais inválidas')
		}

		return this.generateToken(existingUser)
	}
}
