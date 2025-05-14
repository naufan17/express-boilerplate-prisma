import config from "../../../config/config";
import prisma from "../../../config/prisma";
import { v4 as uuidv4 } from "uuid";

export const sessionRepository = () => {
  const create = async (userId: string, ipAddress: string, userAgent: string)  => {
    return await prisma.sessions.create({
      data: {
        id: uuidv4(),
        user_id: userId,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: new Date(Date.now() + Number(config.JWTRefreshExpiredIn))
      }
    })
  };
  
  const findById = async (id: string) => {
    return await prisma.sessions.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        user_id: true,
        expires_at: true
      }
    })
  };
  
  const findByUserId = async (userId: string) => {
    return await prisma.sessions.findMany({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        ip_address: true,
        user_agent: true,
        login_at: true,
        last_active_at: true,
        expires_at: true
      },
      orderBy: {
        login_at: "desc"
      }
    })
  };
  
  const updateLastActive = async (id: string) => {
    return await prisma.sessions.update({
      where: {
        id
      },
      data: {
        last_active_at: new Date()
      }
    })
  };
  
  const updateExpires = async (userId: string) => {
    return await prisma.sessions.updateMany({
      where: {
        user_id: userId
      },
      data: {
        expires_at: new Date()
      }
    })
  };

  return { 
    create, 
    findById, 
    findByUserId, 
    updateLastActive, 
    updateExpires 
  };
};
