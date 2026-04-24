import {prisma } from "../config/prisma.js";
import { Job, JobStatus } from "../generated/prisma/index.js";
export class JobService{
    static async createJob(data: any, userId: string){
      
      const company = await prisma.company.findUnique({
        where:{
           userId: userId
        }
      }) 

      if(!company){
        throw new Error("Company not found for the user")
      }

        const job = await prisma.job.create({
            data:{
                title: data.title,
                description: data.description,
                companyId: company?.id as string,
                location: data.location,
                salary: data.salary,
                jobStatus: "DRAFT",

            }
        })
        return job
    }

  static async getJobsById(jobId: string){
    const job = await prisma.job.findUnique({
        where:{
            id: jobId
            
        }
    })
    return job 
  }




    static async getJobs(query: any){

        const {search, location, salary} = query

         const page = Number(query.page) || 1
         const limit = Number(query.limit) || 10
         const skip = (page - 1 ) * limit

      const where:any={
        JobStatus: "PUBLISHED"
      }

    if(search){
        where.OR = [
            
           {title:{ contains: search , mode: "insensitive"}} ,
            {description:{ contains: search, mode: "insensitive"}}
        ]
        
    }

    if(location){
        where.location =  {contains: location, mode: 'insensitive'}
    }

    if(salary){
        where.salary = {gte: Number(salary)}
    }



        const [jobs, jobCount]  = await prisma.$transaction([
           prisma.job.findMany({
             where,
             skip,
             take: limit,
            include:{
                company:{
                    select:{
                        name: true,
                        description: true,
                        website: true
                    }
                }
            }
           }),
           prisma.job.count({where}) 
        ])

       const totalPages = Math.ceil(jobCount / limit)


        return { 
            data: jobs,
            meta:{
                total: jobCount,
                page,
                totalPages,
                limit
            }
            
        }
    }

  static async updateJobs(data: any, jobId: string, userId: string){

   const company = await prisma.company.findUnique({
    where:{ userId}
   })

   if(!company){
     throw new Error("company not found for the user")
   }

    const updatedJob = await prisma.job.updateMany({
        where:{
            id: jobId,
            companyId: company.id
        },
        data:{
            description: data.description,
            location: data.location,
            salary: data.salary,
            title: data.title


        }
    })
    return updatedJob
  }

 static async deleteJob(jobId: string, userId: string){
    
    const company = await prisma.company.findUnique({
        where:{
            userId
        }
    })

    if(!company){
        throw new Error("company not found for the user")
    }
    
    return await prisma.job.deleteMany({
        where:{
            jobId: jobId,
            companyId: company.id
        }
    })
 }

}