import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apolloClient } from '@/lib/graphql/apollo'
import { LOGIN, REGISTER } from '@/lib/graphql/mutations/auth'
import type { LoginInput, RegisterInput, User } from '@/types/user'

type LoginMutationData = {
	login: {
		token: string
		user: User
	}
}

type RegisterMutationData = {
	register: {
		token: string
		user: User
	}
}

type AuthState = {
	user: User | null
	token: string | null
	isAuthenticated: boolean
	login: (data: LoginInput) => Promise<boolean>
	signup: (data: RegisterInput) => Promise<boolean>
	logout: () => void
	setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			token: null,
			isAuthenticated: false,

			login: async (loginData: LoginInput) => {
				const { data } = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
					mutation: LOGIN,
					variables: {
						data: loginData,
					},
				})

				if (data?.login) {
					const { token, user } = data.login

					set({ user, token, isAuthenticated: true })
					return true
				}

				return false
			},

			signup: async (registerData: RegisterInput) => {
				const { data } = await apolloClient.mutate<RegisterMutationData, { data: RegisterInput }>({
					mutation: REGISTER,
					variables: {
						data: registerData,
					},
				})

				if (data?.register) {
					const { token, user } = data.register

					set({ user, token, isAuthenticated: true })
					return true
				}

				return false
			},

			logout: () => {
				set({ user: null, token: null, isAuthenticated: false })
				apolloClient.clearStore()
			},

			setUser: (user: User) => {
				set({ user })
			},
		}),
		{
			name: 'auth-storage',
		}
	)
)
