import { z } from 'zod';
import { JobStatus } from '../generated/prisma/index.js';
import { create } from 'node:domain';


export const createJobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    location: z.string().min(3, "Location must be at least 3 characters long"),
    salary: z.string().optional(),
    jobStatus: z.nativeEnum(JobStatus).default(JobStatus.DRAFT)
})

export const updateJobSchema = createJobSchema.partial()

export const jobQuerySchema = z.object({
     search: z.string().optional(),
        location: z.string().optional(),
        salary: z.coerce.number().optional(),
        page: z.coerce.number().min(1).default(1),
        limit: z.coerce.number().min(1).max(100).default(10)
})