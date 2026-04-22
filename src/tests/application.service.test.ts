import { jest } from '@jest/globals';


jest.unstable_mockModule('../config/prisma.js', () => ({
  prisma: {
    application: {
      updateMany: jest.fn(),
    },
  },
}));



const { prisma } = await import('../config/prisma.js');
const { ApplicationService } = await import('../services/application.service.js');
const { ApplicationStatus } = await import('../generated/prisma/edge.js');

describe('ApplicationService - updateStatus', () => {

    const mockedUpdateMany = (prisma.application.updateMany as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the Application status successfully', async () => {

    mockedUpdateMany.mockResolvedValue({ count: 1 });

    const result = await ApplicationService.updateStatus(
      'app-123',
      ApplicationStatus.SHORTLISTED,
      'user-123'
    );

    expect(result.count).toBe(1);
    expect(mockedUpdateMany).toHaveBeenCalled();
  });

  it('should throw an error if unauthorized', async () => {
    mockedUpdateMany.mockResolvedValue({ count: 0 });

    await expect(
      ApplicationService.updateStatus('app-123', ApplicationStatus.SHORTLISTED, 'user-123')
    ).rejects.toThrow(/authorized/);
  });
});