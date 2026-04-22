import { jest } from '@jest/globals';
jest.unstable_mockModule('../config/prisma.js',()=>({
    prisma: {
        job: {
          findMany: jest.fn(),
        },
      },
}))


const { prisma } = await import('../config/prisma.js');
const { JobService } = await import('../services/job.service.js');

describe('JobService - getJobs',()=>{
    const mockedFindMany = (prisma.job.findMany as any)

    beforeEach(()=>{
        jest.clearAllMocks()
    })

    it('should return jobs based on search query', async()=>{
        const mockJobs = [ {id: 'job-123', title: 'Node Developer', jobStatus: 'PUBLISHED'} ]
        mockedFindMany.mockResolvedValue(mockJobs)

       const result = await  JobService.getJobs({})

       expect(result).toBe(mockJobs)
       expect(mockedFindMany).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.objectContaining({ JobStatus: "PUBLISHED" })
       }))

       
    })

    it('should return jobs based on the search ', async()=>{
        const mockJobs = [ {id: 'job-123', title: 'Node Developer', JobStatus: 'PUBLISHED'} ]
        mockedFindMany.mockResolvedValue(mockJobs)

        const result = await JobService.getJobs({search: 'Node'})

        expect(mockedFindMany).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.objectContaining({
                OR: [
                    {title:{ contains: 'Node', mode: "insensitive"}},
                    {description:{ contains: 'Node', mode: 'insensitive'}}
                ]
            }),
            include: expect.any(Object)
        }))

        expect(result).toBe(mockJobs)

    })
})