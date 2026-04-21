import { prisma } from "../config/prisma.js";

export class CompanyService{
    static async create(data: any, userId: string){
        const existingCompany = await prisma.company.findUnique({
            where:{
                userId: userId
            }
        })

        if(existingCompany){
            throw new Error("company already Exists for this user")
        }
        const company = await prisma.company.create({
            data:{
                name: data.name,
                description: data.description,
                userId: userId,
                website: data.website
            }
           
    })
    return company
}

static async getCompany(userId: string){
    const company  = await prisma.company.findUnique({
        where:{
            userId: userId
        }
    })
    return company
}


static async updateCompany(data: any, userId: string){
    const company = await prisma.company.findUnique({
        where:{
            userId: userId
        }
    })

    if(!company){
        throw new Error("company not found for the user")
    }

    const updatedCompany = await prisma.company.updateMany({
        where:{
            userId: userId
        },
        data:{
            name: data.name,
            description: data.description,
            website: data.website
        }
    })
    return updatedCompany
}


static async deleteCompany(userId: string){
    return await prisma.company.deleteMany({
        where:{
            userId: userId
        }
        })
    

}}
