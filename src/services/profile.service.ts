import {prisma} from "../config/prisma.js";

export class ProfileService{
    static async upsertProfile(data: any, userId: string){


        const profile = await prisma.profile.upsert({
            where:{
                userId
            },
            create:{
                userId,
                bio: data.bio,
                title: data.title,
                skills: data.skills,

            },
            update:{
                bio: data.bio,
                title: data.title,
                skills: data.skills
            }
        })
    }

    static async getProfile(userId: string){
        const profile = await prisma.profile.findUnique({
            where:{
                userId
            },
            include:{
                user:{
                    select:{
                        name: true,
                        email: true,
                       
                    }
                }
            }
        })
        return profile;
    }

   


}