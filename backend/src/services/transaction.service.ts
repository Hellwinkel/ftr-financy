import { prismaClient } from "../../prisma/prisma";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input";

export class TransactionService {
  async create(data: CreateTransactionInput, userId: string) {
    const { type, description, transactionDate, value, categoryId } = data

    const category = await prismaClient.category.findUnique({
      where: {
        id: categoryId,
        userId
      }
    })

    if(!category) {
      throw new Error("Categoria não encontrada")
    }

    return prismaClient.transaction.create({
      data: {
        type,
        description,
        transactionDate,
        value,
        categoryId,
        userId
      }
    })
  }

  async list(userId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        userId
      },
      orderBy: {
        transactionDate: "desc"
      }
    })
  }

  async update(id: string, data: UpdateTransactionInput, userId: string) {
    const { type, description, transactionDate, value, categoryId } = data

    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id
      }
    })

    if(!transaction) {
      throw new Error("Transação não encontrada")
    }

    if(categoryId) {
      const category = await prismaClient.category.findUnique({
        where: {
          id: categoryId,
          userId
        }
      })

      if(!category) {
        throw new Error("Categoria não encontrada")
      }
    }

    return prismaClient.transaction.update({
      where: {
        id
      },
      data: {
        type,
        description,
        transactionDate,
        value,
        categoryId
      }
    })
  }

  async delete(id: string, userId: string) {
    const transaction = await prismaClient.transaction.findUnique({
      where: {
        id,
        userId
      }
    })

    if(!transaction) {
      throw new Error("Transação não encontrada")
    }

    await prismaClient.transaction.delete({
      where: {
        id
      }
    })

    return true
  }

  async countByCategory(categoryId: string) {
    return prismaClient.transaction.count({
      where: {
        categoryId
      }
    })
  }
}