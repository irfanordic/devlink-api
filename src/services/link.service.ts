import { get } from "node:http";
import {prisma } from "../config/prisma.js";
export class LinkService{
   static async createLink(data: any, userId: string){
       const link = await prisma.link.create({
        data:{
            platform: data.platform,
            url: data.url,
            userId: userId
        }
       })

       return link
   } 


   static async getLinks(userId: string){
    const links  = await prisma.link.findMany({
        where:{
            userId: userId
        }
    })

    return links
   }

   static async deleteLink(userId: string, linkId: string){
     await prisma.link.deleteMany({
    where:{
        id: linkId,
        userId: userId
    }
   })

   const links  =  await LinkService.getLinks(userId)
   return links
}

static async updateLink(userId: string, linkId: string, data: any ){
    const link =  await prisma.link.updateMany({
        where:{
            id: linkId,
            userId:userId
        },
        data:{
            platform: data.platform,
            url: data.url
        }
    })
     return link
}

static async getLinksbyId(userId: string){
    const links  =  await prisma.user.findUnique({
        where:{
            id: userId
        },
        include:{
            password: false,
            links : true
        }
    })

    return links
}


}