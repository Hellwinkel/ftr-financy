import { prismaClient } from "../../prisma/prisma";
import { UpdateUserInput } from "../dtos/input/user.input";

export class UserService {
  async updateUser(id: string, data: UpdateUserInput) {
    const { name } = data

    if(!name.trim()) {
      throw new Error("Nome inválido")
    }

    return prismaClient.user.update({
      where: {
        id
      },
      data: {
        name: name.trim()
      }
    })
  }
}