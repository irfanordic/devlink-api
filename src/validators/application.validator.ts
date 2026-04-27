import { z } from 'zod';
import { ApplicationStatus } from '../generated/prisma/index.js';

export const applicationSchema = z.object({
    coverLetter: z.string().min(10, "Cover letter must be at least 10 characters long"),
    resumeUrl: z.string().url("Invalid URL format"),
    status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.PENDING)
});

export const updateApplicationStatusSchema = z.object({
    status: z.nativeEnum(ApplicationStatus)
});