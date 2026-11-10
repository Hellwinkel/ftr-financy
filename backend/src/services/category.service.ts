import { prismaClient } from '../../prisma/prisma'
import type { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input'

export class CategoryService {
	async create(data: CreateCategoryInput, userId: string) {
		const { title, description, icon, color } = data

		return prismaClient.category.create({
			data: {
				title,
				description,
				icon,
				color,
				userId,
			},
		})
	}

	async list(userId: string) {
		return prismaClient.category.findMany({
			where: {
				userId,
			},
		})
	}

	async update(id: string, data: UpdateCategoryInput, userId: string) {
		const { title, description, icon, color } = data

		const category = await prismaClient.category.findUnique({
			where: {
				id,
				userId,
			},
		})

		if (!category) {
			throw new Error('Categoria não encontrada')
		}

		return prismaClient.category.update({
			where: {
				id,
			},
			data: {
				title,
				description,
				icon,
				color,
			},
		})
	}

	async delete(id: string, userId: string) {
		const category = await prismaClient.category.findUnique({
			where: {
				id,
				userId,
			},
		})

		if (!category) {
			throw new Error('Categoria não encontrada')
		}

		await prismaClient.category.delete({
			where: {
				id,
			},
		})

		return true
	}

	async findById(id: string) {
		const category = await prismaClient.category.findUnique({
			where: {
				id,
			},
		})

		if (!category) {
			throw new Error('Categoria não encontrada')
		}

		return category
	}
}
