import { v4 as uuidv4 } from "uuid";
import prisma from "../../../config/prisma";

export const userRepository = () => {
  const create = async (name: string, email: string, password: string) => {
    return await prisma.users.create({
      data: {
        id: uuidv4(),
        name,
        email,
        password,
      },
    })
  };
  
  const findByEmail = async (email: string) => {
    return await prisma.users.findUnique({
      where: {
        email
      },
      select: {
        id: true,
        email: true,
        password: true
      }
    })
  };
  
  const findById = async (id: string) => {
    return await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        address: true,
        profile_picture: true,
        is_verified: true
      }
    })
  };
  
  const updateProfile = async (id: string, name: string | undefined, email: string | undefined, phoneNumber: string | undefined, address: string | undefined) => {
    return await prisma.users.update({
      where: {
        id
      },
      data: {
        name,
        email,
        phone_number: phoneNumber,
        address,
      }
    })
  };
  
  const updatePassword = async (id: string, password: string) => {
    return await prisma.users.update({
      where: {
        id
      },
      data: {
        password
      }
    })
  };
  
  return {
    create,
    findByEmail,
    findById,
    updateProfile,
    updatePassword,
  };
}
