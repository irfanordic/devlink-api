import {prisma } from "../config/prisma.js";


export class ApplicationService{
    static async apply(data: any, userId: string, jobId: string){
        const job = await prisma.job.findFirst({
            where:{
                id: jobId
            }
        })

        if(!job) throw new Error("job not found")
        
            const existingApplication = await prisma.application.findFirst({
                where:{
                    userId,
                    jobId
                }
            })
            if(existingApplication) throw new Error("already applied for this job")

            return await prisma.application.create({
                    data:{
                        userId,
                        jobId,
                        coverLetter: data.coverLetter,
                        resumeUrl: data.resumeUrl,
                        status: "PENDING"
                    }
                })
                
    }

    static async getApplications(userId: string, jobId: string){
        const job = await prisma.job.findFirst({
            where:{
                id: jobId,
                company:{userId}
            }
        })

        if(!job) throw new Error("job not found")
            return await prisma.application.findMany({
        where:{
            jobId: jobId
        },
        include:{
            user:{ select:{
                name: true, email: true
            }}
        }
    })
    }

    static async myApplications(userId: string){
        return await prisma.application.findMany({
            where:{
                userId 
            },
            include:{
                job:{
                    select:{
                        title: true,
                        company:{
                            select:{
                                name: true,
                                website:true
                            }
                        }

                    }

                }
            }
        })
    }
}