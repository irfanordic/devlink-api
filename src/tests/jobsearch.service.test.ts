import { jest } from '@jest/globals';

jest.unstable_mockModule('../config/prisma.js', () => ({
  prisma: {
    $transaction: jest.fn(),
    job: {
      findMany: jest.fn((args) => args), 
      count: jest.fn((args) => args),
    },
  },
}));

const { prisma } = await import('../config/prisma.js');
const { JobService } = await import('../services/job.service.js');

describe('JobService - getJobs', () => {
    let mockedTransaction: any;

    beforeEach(() => {
        jest.clearAllMocks();
        mockedTransaction = prisma.$transaction as any;
    });

    it('should return jobs based on search query', async () => {
        const mockJobs = [{ id: 'job-123', title: 'Node Developer', JobStatus: 'PUBLISHED' }];
        const count = 1;
        
        mockedTransaction.mockResolvedValue([mockJobs, count]);

        const result = await JobService.getJobs({ page: 1, limit: 10 });

        expect(result.data).toBe(mockJobs);
        expect(result.meta).toEqual({
            total: count,
            page: 1,
            limit: 10,
            totalPages: 1
        });

        expect(mockedTransaction).toHaveBeenCalled();
    });

    it('should return jobs based on the search', async () => {
        const mockJobs = [{ id: 'job-123', title: 'Node Developer', JobStatus: 'PUBLISHED' }];
        mockedTransaction.mockResolvedValue([mockJobs, 1]);
    
        const result = await JobService.getJobs({ search: 'Node' });
    
        expect(mockedTransaction).toHaveBeenCalled();
        
        const queries = mockedTransaction.mock.calls[0][0];
        const findManyQuery = queries[0];
    
        expect(findManyQuery).toMatchObject({
            where: {
                OR: expect.arrayContaining([
                    expect.objectContaining({
                        title: { contains: 'Node', mode: 'insensitive' }
                    })
                ])
            }
        });
    
        expect(result.data).toBe(mockJobs);
    });
});